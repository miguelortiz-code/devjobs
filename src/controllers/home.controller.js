import {Vacancy} from '../models/index.model.js';

const displayJobs = (req, res) =>{
    res.render('home', {
        namePage: 'devJobs',
        tagline: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        navbar: true,
        button: true
    });
}
// Vista para mostrar el formulario de una nueva vacante
const formVacancie = (req, res) =>{
    res.render('new-vacancy', {
        namePage: 'Crear Vacante',
        tagline:  'Llena el formulario y publica la vacante'
    });
};


const addVacancy = async (req, res) =>{
    // Extraer datos del formulario
    const {title, company, ubication, salary, contract, description, skills} = req.body

    const vacancy = new Vacancy({
        title,
        company,
        ubication,
        salary,
        contract,
        description,
        skills: skills.split(',') // Crear arreglo de Habilidades (Skills)
    });
    // Almacenar en la base de datos
    const newVacancy = await vacancy.save();
    
    // Redireccionar al usuario
    res.redirect(`/vacancies/${newVacancy.url}`);
};


export{
    displayJobs,
    formVacancie,
    addVacancy
}