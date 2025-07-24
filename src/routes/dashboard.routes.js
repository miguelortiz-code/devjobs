import express from 'express';
import { viewAdmin } from '../controllers/dashboard.controller.js';
import {isAuthenticated, noCache} from '../middleware/authenticated.middleware.js';
const router = express.Router();

router.get('/admin', isAuthenticated, noCache, viewAdmin);

export default router