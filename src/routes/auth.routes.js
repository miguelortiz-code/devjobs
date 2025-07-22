import express from  'express';
import {formRegister, register, formLogin, login} from '../controllers/auth.controller.js';
const router = express.Router();


// Router GET
router.get('/register', formRegister);
router.get('/login', formLogin);

//Router POST
router.post('/register', register);
router.post('/login', login);


export default router