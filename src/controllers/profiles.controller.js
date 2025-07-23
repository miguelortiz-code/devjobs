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

export{
    viewProfile
}