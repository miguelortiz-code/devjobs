import { check, validationResult } from 'express-validator';
import passport from 'passport';
import crypto from 'crypto';
import Users from '../models/users.model.js';
import { resetPassword } from '../helpers/email.helper.js';

// Vista para mostrar el formulario de registro
const formRegister = (req, res) =>{
    res.render('auth/register', {
        namePage: 'Crea tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    });
}
// Función para registrar al usuario
const register = async (req, res) =>{
    // Extraer los datos del formulario
    const {name, email, password} = req.body;
    // Validar y sanitizar los campos
    await check('name').notEmpty().withMessage('El nombre es obligatorio').trim().escape().toLowerCase().run(req);
    await check('email').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('El formato del correo es inválido').normalizeEmail().run(req);
    await check('password').notEmpty().withMessage('La contraseña es obligatoria').isLength({ min: 6 }).withMessage('La contraseña debe tener mínimo 6 caracteres').trim().run(req);
    await check('confirm_password').notEmpty().withMessage('La confirmación de la contraseña es obligatoria')
    .custom((val, { req }) => {
        if (val !== req.body.password) {
        throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }).trim().run(req);

    let result = validationResult(req);
    
    
    // Validar si el resultado está vacio
    if(!result.isEmpty()){
        //Errors
        req.flash('error', result.array().map(res => res.msg));
        return res.render('auth/register', {
            namePage: 'Crea tu cuenta en devJobs',
            tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            message: req.flash()

        });
    }

   const user = new Users({ name, email, password });
    try {
        await user.save();
        res.redirect('/auth/login');
    } catch (error) {
        req.flash('error', error.message || 'Hubo un error al registrar el usuario');
        res.redirect('/auth/register');
    }
}

const formLogin = (req, res) =>{
    res.render('auth/login', {
        namePage: 'Iniciar Sesión devJobs'
    })
}

const login = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/auth/login',
        failureFlash: true,
        badRequestMessage: 'Los campos son obligatorios'
    })(req, res, next);
};
const logout = (req, res, next) =>{
    req.logout(function(err){
        if(err){
            return next(err);
        }
        req.flash('correcto', 'Has cerrado sessión exitosamente');
        return res.redirect('/auth/login');
    });
};

const formRecoverPassword = (req, res) =>{
    res.render('auth/recover-password', {
        namePage: 'Recuperar Contraseña',
        tagline: 'Si ya tienes una cuenta pero olvidaste tu password, coloca tu email'
    });
}

const recoverPassword = async (req, res, next) =>{
    // Extraer datos del input
    const {email} = req.body;
    
    // Validar y sanitizar los campos
    await check('email').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('El formato del correo es inválido').normalizeEmail().run(req);
    let result = validationResult(req);
    
    // Validar si el resultado está vacio
    if(!result.isEmpty()){
        //Errors
        req.flash('error', result.array().map(res => res.msg));
        return res.render('auth/recover-password', {
            namePage: 'Recuperar Contraseña',
            tagline: 'Si ya tienes una cuenta pero olvidaste tu password, coloca tu email',
            message: req.flash()
        });
    }

    // Consultar al usuario mediante el correo electrónico
    const user = await Users.findOne({email});
    // Si no existe el usuario
    if(!user){
        req.flash('error', 'El correo ingresado no se encuentra registrado');
        return res.redirect('/auth/recover-password')
    }

    // Si existe el usuario, se genera el token
    user.token = crypto.randomBytes(20).toString('hex');
    user.expire = Date.now() + 3600000;

    // Guadar el usuario
    await user.save();
    
    // Crear url para enviar correo electrónico
    const resetUrl = `http://${req.headers.host}/recover-password/${user.token}`;
    
    // Enviar correo electrónico
    await resetPassword({
       email: user.email,
       name: user.name,
       resetUrl,
       archive
    });

    // Redireccionar al usuario
    req.flash('correcto', 'Revisa tu email para las instrucciones de reestablecer tu contraseña')
    res.redirect('/auth/login');

};
export{
    formRegister,
    register,
    formLogin,
    formRecoverPassword,
    login,
    logout,
    recoverPassword
}