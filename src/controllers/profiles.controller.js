import {Users} from '../models/index.model.js';

const viewProfile = async (req, res ) =>{
    try {
        // Extraer el id del usuario que inicio sesión
        const {_id} = req.user;
        // Consultar en la base de datos el usuario
        const user = await Users.findById(_id);
        // Si no hay usuario autenticado
        if (!user) {
            return  res.redirect('/auth/login');
        }

        res.render('auth/profile',{
            namePage: 'Edita tu perfil en devJobs',
            user
        });   
    } catch (error) {
        console.log(`Error al obtener la información del usuario: ${error}`);
        res.redirect('/auth/login');
    }
}

const profile = async (req, res) =>{
    try {
        // Extraer campos del formulario
        const {name, email, password, confirm_password} = req.body;
        // Consultar al usuario
        const{_id} = req.user;
        const user  = await Users.findById(_id);

        if(!user){
            return res.redirect('/auth/login');
        }
        // Actualizar campos
        user.name = name;
        user.email = email
        
          // Verificar si el usuario quiere actualizar la contraseña
        if (password && password.trim() !== '') {
            if (password !== confirm_password) {
                req.flash('error', 'Las contraseñas no coinciden');
                return res.redirect('/account/profile');
            }

            user.password = password;
        }
        // Actualizar perfil
        await user.save();

        req.flash('correcto' , 'Perfil actualizado correctamente');

        // Redireccionar al usuario
        res.redirect('/admin');

    } catch (error) {
        console.log(`Error al guardar los cambios: ${error}`);
        res.redirect('/auth/login');
    }
    
};

export{
    viewProfile,
    profile
}