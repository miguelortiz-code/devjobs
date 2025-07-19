import express from 'express';
import {displayJobs, formVacancie, addVacancy, showVacancy} from '../controllers/home.controller.js';
const router = express.Router();

// Rutas Get
router.get('/', displayJobs);
router.get('/vacancies/new', formVacancie); // Crear Vacantes
router.get('/vacancy/:url', showVacancy) // Mostrar Vacante 
// Rutas POST
router.post('/vacancies/new', addVacancy)


export default router