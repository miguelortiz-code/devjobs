import express from 'express';
import {displayJobs, formVacancie} from '../controllers/home.controller.js';
const router = express.Router();

// Rutas Get
router.get('/', displayJobs);
router.get('/vacancies/new', formVacancie); // Crear Vacantes


export default router