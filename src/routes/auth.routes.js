import express from  'express';
import {formRegister} from '../controllers/auth.controller.js';
const router = express.Router();


// Router GET
router.get('/register', formRegister);

export default router