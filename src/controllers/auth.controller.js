import { check, validationResult } from 'express-validator';
import passport from 'passport';
import Users from '../models/users.model.js';

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
    await check('name').trim().escape().notEmpty().withMessage('El nombre es obligatorio').run(req);
    await check('email').trim().normalizeEmail().notEmpty().withMessage('El correo es obligatario').isEmail().withMessage('El formato del correo es obligatrio').run(req);
    await check('password').trim().escape().notEmpty().withMessage('La contraseña es obligatoria').isLength({min:6}).withMessage('La contraseña debe tener minimo 6 caracteres').run(req);
    await check('confirm_password').trim().escape().custom((val, {req})=>{
        if(val !== req.body.password){
            throw new Error('Las contraseñas no coninciden');
        }
        return true;
    }).run(req);

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

export{
    formRegister,
    register,
    formLogin,
    login
}