import express from 'express';
import { viewProfile, profile } from '../controllers/profiles.controller.js';
import {isAuthenticated, noCache} from '../middleware/authenticated.middleware.js';
import upload from '../middleware/multer.middleware.js';
const router = express.Router();

router.get('/profile', isAuthenticated, noCache, viewProfile);
router.post('/profile', isAuthenticated, noCache, upload.single('image'), profile);

export default router;