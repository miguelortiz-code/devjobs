import express from 'express';
import { viewAdmin, viewCandidate } from '../controllers/dashboard.controller.js';
import {isAuthenticated, noCache} from '../middleware/authenticated.middleware.js';
const router = express.Router();

router.get('/admin', isAuthenticated, noCache, viewAdmin);
router.get('/candidates/:id', isAuthenticated, noCache, viewCandidate);

export default router