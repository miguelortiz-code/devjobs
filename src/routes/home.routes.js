import express from 'express';
import {displayJobs, formVacancie, addVacancy} from '../controllers/home.controller.js';
const router = express.Router();

// Rutas Get
router.get('/', displayJobs);
router.get('/vacancies/new', formVacancie); // Crear Vacantes

// Rutas POST
router.post('/vacancies/new', addVacancy)


export default router