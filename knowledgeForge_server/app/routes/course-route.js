import express from 'express'
import Courses from '../models/course.js';
import * as courseController from '../controllers/course-contoller.js';


const router = express.Router();

router.get('/',courseController.findCourse);
router.post('/',courseController.postCourse);
router.put('/:_id',courseController.updateCourse);
router.delete('/:_id',courseController.deleteCourse);

export default router;