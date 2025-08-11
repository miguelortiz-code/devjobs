import express from  'express';
import {formRegister, register, formLogin, login, logout, formRecoverPassword, recoverPassword, checkToken} from '../controllers/auth.controller.js';
import {isAuthenticated} from '../middleware/authenticated.middleware.js'
const router = express.Router();


// Router GET
router.get('/register', formRegister);
router.get('/login', formLogin);
router.get('/logout', isAuthenticated, logout)
router.get('/recover-password', formRecoverPassword);
router.get('/recover-password/:token', checkToken);

//Router POST
router.post('/register', register);
router.post('/login', login);
router.post('/recover-password', recoverPassword)

export default router