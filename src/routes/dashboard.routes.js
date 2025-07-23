import express from 'express';
import { viewAdmin } from '../controllers/dashboard.controller.js';
import {isAuthenticated} from '../middleware/authenticated.middleware.js';
const router = express.Router();

router.get('/admin', isAuthenticated, viewAdmin);

export default router