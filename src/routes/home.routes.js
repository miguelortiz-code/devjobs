import express from 'express';
import {displayJobs, formVacancie, addVacancy, showVacancy, formEditVacancy, editVacancy} from '../controllers/home.controller.js';
const router = express.Router();

// Rutas Get
router.get('/', displayJobs);
router.get('/vacancies/new', formVacancie); // formulario para crear Vacantes
router.get('/vacancy/:url', showVacancy) // Mostrar Vacante 
router.get('/vacancy/edit/:url', formEditVacancy); // Editar Vacante
// Rutas POST
router.post('/vacancies/new', addVacancy) // Agregar nueva vacante
router.post('/vacancies/edit/:url', editVacancy) // Editar vacante


export default router