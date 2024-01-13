import express from 'express'
import * as authController from '../controllers/auth-controller.js';


const router = express.Router();
router.post('/user/register',authController.registerUser);
router.post('/instructor/register',authController.registerInstructor);
router.post('/user/login',authController.loginUser);
router.post('/instructor/login',authController.loginInstructor);
router.get('/logout',authController.logout);


export default router;
