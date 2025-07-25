import {check, validationResult} from 'express-validator';
import {Users} from '../models/index.model.js';

const viewProfile = async (req, res ) =>{
    try {
        // Extraer el id del usuario que inicio sesión
        const {_id, name} = req.user;
        // Consultar en la base de datos el usuario
        const user = await Users.findById(_id);
        // Si no hay usuario autenticado
        if (!user) {
            return  res.redirect('/auth/login');
        }

        res.render('auth/profile',{
            namePage: 'Edita tu perfil en devJobs',
            user,
            logout: true,
            name
        });   
    } catch (error) {
        console.log(`Error al obtener la información del usuario: ${error}`);
        res.redirect('/auth/login');
    }
}

const profile = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    const { _id } = req.user;

    const user = await Users.findById(_id);
    if (!user) return res.redirect('/auth/login');

    // Validar campos
    await check('name').notEmpty().withMessage('El nombre es obligatorio').trim().escape().toLowerCase().run(req);
    await check('email').notEmpty().withMessage('El correo es obligatorio').isEmail().withMessage('Debe ingresar un correo válido').normalizeEmail().run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      req.flash('error', result.array().map(err => err.msg));
      return res.render('auth/profile', {
        namePage: 'Edita tu perfil en devJobs',
        user,
        logout: true,
        name: req.user.name,
        message: req.flash()
      });
    }

    // Actualizar campos
    user.name = name;
    user.email = email;

    // Actualizar contraseña si se proporcionó
    if (password && password.trim() !== '') {
      if (password !== confirm_password) {
        req.flash('error', 'Las contraseñas no coinciden');
        return res.redirect('/account/profile');
      }

      user.password = password;
    }

    await user.save();

    req.flash('success', 'Perfil actualizado correctamente');
    res.redirect('/admin');

  } catch (error) {
    console.error('Error al guardar los cambios:', error);
    res.redirect('/auth/login');
  }
};

export{
    viewProfile,
    profile
}