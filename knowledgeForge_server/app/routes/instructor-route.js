// Importing the express module
import express from 'express';

// Importing the 'Instructor' model from the models directory
import Instructor from '../models/instructor.js';

// Importing controller functions from the instructor controller module
import * as instructorController from '../controllers/instructor-controller.js';

// Creating an express Router instance
const router = express.Router();

// Define routes for handling instructor data
router.route('/')
    .get(instructorController.findInstructor) // GET request to retrieve instructor data
    .post(instructorController.postInstructor) // POST request to create a new instructor
    .put(instructorController.putInstructor);
router.route('/:id')
     // PUT request to update an existing instructor
    .delete(instructorController.deleteInstructor); // DELETE request to remove an existing instructor
router.route('/current')
    .get(instructorController.getOneInsrtuctor);
router.route('/mycourses')
    .get(instructorController.getInstructorCourses);
router.route('/mycourses/:id')
    .post(instructorController.addCourseToInstructor);
    

// Exporting the router for use in other files
export default router;
