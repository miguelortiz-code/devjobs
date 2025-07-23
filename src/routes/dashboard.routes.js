import express from 'express';
import { viewAdmin } from '../controllers/dashboard.controller.js';
const router = express.Router();

router.get('/admin', viewAdmin);

export default router