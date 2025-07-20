import express from  'express';
import {formRegister, register} from '../controllers/auth.controller.js';
const router = express.Router();


// Router GET
router.get('/register', formRegister);

//Router POST
router.post('/register', register);

export default router