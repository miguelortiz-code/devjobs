import express from 'express';
import { viewProfile, profile } from '../controllers/profiles.controller.js';
import {isAuthenticated, noCache} from '../middleware/authenticated.middleware.js';
const router = express.Router();

router.get('/profile', isAuthenticated, noCache, viewProfile);
router.post('/profile', isAuthenticated, noCache, profile);

export default router;