import express from 'express';
import { viewProfile, profile } from '../controllers/profiles.controller.js';
import {isAuthenticated} from '../middleware/authenticated.middleware.js';
const router = express.Router();

router.get('/profile', isAuthenticated, viewProfile);
router.post('/profile', isAuthenticated, profile);

export default router;