import {Vacancy} from '../models/index.model.js';

const displayJobs =  async (req, res, next) =>{
    // Consultar las vacantes
    const vacancies = await Vacancy.find();
    
    if(!vacancies) return next();
    // Renderizar las vacantes a la vista principal
    res.render('home', {
        namePage: 'devJobs',
        tagline: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        navbar: true,
        button: true,
        vacancies
    });
}
// Vista para mostrar el formulario de una nueva vacante
const formVacancie = (req, res) =>{
    res.render('new-vacancy', {
        namePage: 'Crear Vacante',
        tagline:  'Llena el formulario y publica la vacante'
    });
};

// Función para agregar nueva vacante
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
    res.redirect(`/vacancy/${newVacancy.url}`);
};

// función para agregar nueva vacante
const showVacancy =  async (req, res, next) =>{
    // Extraer la url de la vacante de  la url
    const {url} = req.params;
    // consultar la vacante des de la base de datos
    const vacancy = await Vacancy.findOne({url: url});
    // Si no existe vacante 
    if(!vacancy) return next();
    // Si existe al menos una vacante mostrar la vacante
    res.render('vacancies/show-vacancy', {
        namePage: vacancy.title,
        navbar: true,
        vacancy
    })

}


export{
    displayJobs,
    formVacancie,
    addVacancy,
    showVacancy
}