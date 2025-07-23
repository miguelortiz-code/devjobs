import express from 'express';
import {displayJobs, formVacancie, addVacancy, showVacancy, formEditVacancy, editVacancy} from '../controllers/home.controller.js';
import {isAuthenticated} from '../middleware/authenticated.middleware.js';
const router = express.Router();

// Rutas Get
router.get('/', displayJobs);
router.get('/vacancies/new', isAuthenticated, formVacancie); // formulario para crear Vacantes
router.get('/vacancy/:url', showVacancy) // Mostrar Vacante 
router.get('/vacancy/edit/:url', isAuthenticated, formEditVacancy); // Editar Vacante
// Rutas POST
router.post('/vacancies/new', isAuthenticated, addVacancy) // Agregar nueva vacante
router.post('/vacancies/edit/:url', isAuthenticated, editVacancy) // Editar vacante


export default router