import express from 'express';
import { viewProfile } from '../controllers/profiles.controller.js';
import {isAuthenticated} from '../middleware/authenticated.middleware.js';
const router = express.Router();

router.get('/profile', isAuthenticated, viewProfile);


export default router;