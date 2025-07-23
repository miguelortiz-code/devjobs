import {Vacancy} from '../models/index.model.js';
import {typeContract} from '../helpers/handlebars.helper.js'

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
    const {_id} = req.user;
    const vacancy = new Vacancy({
        title,
        company,
        ubication,
        salary,
        contract,
        description,
        skills: skills.split(','), // Crear arreglo de Habilidades (Skills)
        autor: _id
    });
    // Almacenar en la base de datos
    const newVacancy = await vacancy.save();
    
    // Redireccionar al usuario
    res.redirect(`/vacancy/${newVacancy.url}`);
};

// función para mostrar nueva vacante
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

// Función para mostrar la vista del formulario de edición de la vacante
const formEditVacancy = async (req, res, next) =>{
    // Extraer la url de la vacante desde la url
    const {url} = req.params;
    // Consultar vacante desde la base de datos
    const vacancy = await Vacancy.findOne({url: url});

    // Si no existe Vacante 
    if(!vacancy) return next();

    // Validar que los skills sean un array
    let selectedSkills = [];
    if( typeof vacancy.skills === 'string'){
        selectedSkills = vacancy.skills.split(',').map(skill => skill.trim());
    }else if(Array.isArray(vacancy.skills)){
        selectedSkills = vacancy.skills;
    }


    // Si Existe la vacante renderizar el formulario
    res.render('vacancies/edit-vacancy', {
        namePage: `Editar - ${vacancy.title}`,
        vacancy,
        typeContract,
        skills: selectedSkills
    })
}

// Función para editar vacantes
const editVacancy = async(req, res, next) =>{
    try{
        // Extraer la url de la vacante desde la url
        const {url } = req.params;

        // Extraer datos del formulario
        const {title, company, ubication, salary, contract, description, skills} = req.body

        // Actualizar Vacante
        const vacancy = await Vacancy.findOneAndUpdate({url: url}, {
            title,
            company,
            ubication,
            salary,
            contract,
            description,
            skills: skills.split(',')
        }, {
            new: true,
            runValidators: true,
        });
        // Si no existe la vacante a editar
        if(!vacancy) return next();

        // Redireccionamos a la vacante actualizada
        res.redirect(`/vacancy/${vacancy.url}`);
    }catch(error){
        console.log("Error al editar la vacante: ", error);
        return next()
    }
}


export{
    displayJobs,
    formVacancie,
    addVacancy,
    showVacancy,
    formEditVacancy,
    editVacancy
}