import Users from '../models/users.model.js';

// Vista para mostrar el formulario de registro
const formRegister = (req, res) =>{
    res.render('auth/register', {
        namePage: 'Crea tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    });
}

const register = async (req, res) =>{
    // Extraer los datos del formulario
    const {name, email, password} = req.body;

    // Almacenar el usuario
    const user  = await Users.create({
        name,
        email,
        password
    });

    const newUser = await user.save();

    // Si no se crea el usuario
    if(!newUser){
        return next();
    }

    // Redireccionar la usuario
    res.redirect('/login');


}

export{
    formRegister,
    register
}