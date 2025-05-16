import express from 'express';
import * as authController from '../controller/authController.js';

const router = express.Router();

//login for customer
router.post('/login', authController.login);
//register
router.post('/register', authController.register);
export default router;