import express from  'express';
import {formRegister, register, formLogin, login, logout} from '../controllers/auth.controller.js';
import {isAuthenticated} from '../middleware/authenticated.middleware.js'
const router = express.Router();


// Router GET
router.get('/register', formRegister);
router.get('/login', formLogin);
router.get('/logout', isAuthenticated, logout)

//Router POST
router.post('/register', register);
router.post('/login', login);


export default router