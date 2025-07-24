import express from 'express';
import {displayJobs, formVacancie, addVacancy, showVacancy, formEditVacancy, editVacancy} from '../controllers/home.controller.js';
import {isAuthenticated, noCache} from '../middleware/authenticated.middleware.js';
const router = express.Router();

// Rutas Get
router.get('/', displayJobs);
router.get('/vacancies/new', isAuthenticated, noCache, formVacancie); // formulario para crear Vacantes
router.get('/vacancy/:url', showVacancy) // Mostrar Vacante 
router.get('/vacancy/edit/:url', isAuthenticated, noCache, formEditVacancy); // Editar Vacante
// Rutas POST
router.post('/vacancies/new', isAuthenticated, noCache, addVacancy) // Agregar nueva vacante
router.post('/vacancies/edit/:url', isAuthenticated, noCache, editVacancy) // Editar vacante


export default router