import express from 'express';
import User from '../models/user.js';
import * as userController from '../controllers/user-controller.js';


const router = express.Router();

router.route('/')
    .get(userController.findUser)
    .post(userController.postUser)
    .put(userController.putUser);

router.route('/:id')
    
    .delete(userController.deleteUser);
router.route('/current')
    .get(userController.getOneUser);
router.route('/registeredCourses')
    .get(userController.getRegisteredCourses);
router.route('/registeredCourses/:id')
    .get(userController.checkRegistration)
    .post(userController.registerInCourse);
router.route('/courseProgress')
    .post(userController.updateCourseProgress);
    
router.route('/courseProgress/:id')
    .get(userController.getCourseProgress);


export default router;