import { check, validationResult} from 'express-validator';
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
    const {name} = req.user;
    res.render('new-vacancy', {
        namePage: 'Crear Vacante',
        tagline:  'Llena el formulario y publica la vacante',
        logout: true,
        name
    });
};

// Función para agregar nueva vacante
const addVacancy = async (req, res) =>{
    // Extraer datos del formulario
    const {title, company, ubication, salary, contract, description, skills} = req.body
    const {_id, name} = req.user;
    // Validar y sanitizar campos
    await check('title').notEmpty().withMessage('El nombre la vacante es obligatorio').trim().escape().toLowerCase().run(req);
    await check('company').notEmpty().withMessage('La empresa es obligatoria').trim().escape().toLowerCase().run(req);
    await check('ubication').notEmpty().withMessage('La ubicación es obligatoria').trim().escape().toLowerCase().run(req);
    await check('salary').notEmpty().withMessage('El salario debe ser mayor a 0').trim().escape().isNumeric().run(req);
    await check('contract').notEmpty().withMessage('Debes seleccionar un tipo de contrato').trim().escape().toLowerCase().run(req);
    await check('description').notEmpty().withMessage('La descripción es obligatoria').isLength({ min: 20 }).withMessage('La descripción debe tener un mínimo de 20 caracteres').trim().escape().toLowerCase().run(req);
    await check('skills').notEmpty().withMessage('Debes seleccionar al menos una habilidad').trim().escape().toLowerCase().run(req);
    // Mostrar errores
    const result = validationResult(req);
    // Validar si el resultado está vacio
    if(!result.isEmpty()){
        // Errors
        req.flash('error', result.array().map(res => res.msg));
        return res.render('new-vacancy', {
            namePage: 'Crear Vacante',
            tagline:  'Llena el formulario y publica la vacante',
            logout: true,
            name,
            message: req.flash()
        });
    };

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
    const {name} = req.user;
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
        skills: selectedSkills,
        logout: true,
        name,
        message: req.flash()
    })
}

// Función para editar vacantes
const editVacancy = async (req, res, next) => {
  try {
    const { url } = req.params;
    const { name } = req.user;
    const { title, company, ubication, salary, contract, description, skills } = req.body;

    // Buscar vacante antes para usarla en la vista si hay errores
    const vacancy = await Vacancy.findOne({url: url});
    if (!vacancy) return next();

    // Validar campos
    await check('title').notEmpty().withMessage('El nombre la vacante es obligatorio').trim().escape().run(req);
    await check('company').notEmpty().withMessage('La empresa es obligatoria').trim().escape().run(req);
    await check('ubication').notEmpty().withMessage('La ubicación es obligatoria').trim().escape().run(req);
    await check('salary').notEmpty().withMessage('El salario debe ser mayor a 0').isNumeric().withMessage('El salario debe ser un número').trim().run(req);
    await check('contract').notEmpty().withMessage('Debes seleccionar un tipo de contrato').trim().escape().run(req);
    await check('description').notEmpty().withMessage('La descripción es obligatoria').isLength({ min: 20 }).withMessage('La descripción debe tener un mínimo de 20 caracteres').trim().escape().run(req);
    await check('skills').notEmpty().withMessage('Debes seleccionar al menos una habilidad').trim().escape().run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      req.flash('error', result.array().map(res => res.msg));
      const selectedSkills = typeof skills === 'string' ? skills.split(',') : vacancy.skills;
      return res.render('vacancies/edit-vacancy', {
        namePage: `Editar - ${vacancy.title}`,
        vacancy,
        typeContract,
        skills: selectedSkills,
        logout: true,
        name,
        message: req.flash()
      });
    }

    // Actualizar Vacante
    vacancy.title = title;
    vacancy.company = company;
    vacancy.ubication = ubication;
    vacancy.salary = salary;
    vacancy.contract = contract;
    vacancy.description = description;
    vacancy.skills = skills.split(',');
    await vacancy.save();
    req.flash('correcto', 'Vacante actualizada correctamente');
    res.redirect(`/vacancy/${vacancy.url}`);
  } catch (error) {
    console.log("Error al editar la vacante: ", error);
    return next();
  }
};


export{
    displayJobs,
    formVacancie,
    addVacancy,
    showVacancy,
    formEditVacancy,
    editVacancy
}