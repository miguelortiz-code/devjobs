import express from 'express';
import { viewProfile, profile } from '../controllers/profiles.controller.js';
import {isAuthenticated, noCache, upload, multerErrorHandler} from '../middleware/index.middleware.js';
const router = express.Router();

router.get('/profile', isAuthenticated, noCache, viewProfile);
router.post('/profile', isAuthenticated, noCache, upload.single('image'), multerErrorHandler, profile);

export default router;