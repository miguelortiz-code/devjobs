import express from 'express';
import {displayJobs} from '../controllers/home.controller.js';
const router = express.Router();

// Rutas Get
router.get('/', displayJobs);


export default router