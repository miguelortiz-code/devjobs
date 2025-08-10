import {Vacancy} from '../models/index.model.js';

const viewAdmin = async (req, res) =>{
    // Extraer el id del autor de la vacante
    const {_id, name, image} = req.user;
    // consultar en la bd el id del usuario
    const  vacancy = await Vacancy.find({autor: _id})
    // Renderizar el panel administrativo
    res.render('admin/dashboard',{
        namePage: 'Panel administativo',
        tagline: 'Crea y administra tus vacantes desde aquí',
        vacancy,
        logout: true,
        name,
        image
    })
}

const viewCandidate = async (req, res) =>{
    // Extraer el id del candidato desda la url
    const {id} = req.params;
    const {_id, name, image} = req.user;
    // Consultar el candidatos desda la bd
    const vacancy = await Vacancy.findById(id);

    if(vacancy.autor != _id.toString()){
        return next();
    }

    if(!vacancy){
        return next();
    }

    res.render('admin/candidates', {
        namePage: `Candidatos Vacante - ${vacancy.title}`,
        logout: true,
        name,
        image,
        candidates: vacancy.candidates
    })
}
export{
    viewAdmin,
    viewCandidate
}