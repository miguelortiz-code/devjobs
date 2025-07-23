import {Vacancy} from '../models/index.model.js';

const viewAdmin = async (req, res) =>{
    // Extraer el id del autor de la vacante
    const {_id} = req.user;
    // consultar en la bd el id del usuario
    const  vacancy = await Vacancy.find({autor: _id})
    // Renderizar el panel administrativo
    res.render('admin/dashboard',{
        namePage: 'Panel administativo',
        tagline: 'Crea y administra tus vacantes desde aquí',
        vacancy
    })
}

export{
    viewAdmin
}