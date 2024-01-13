import { response } from 'express';
import * as CourseService from '../services/course-service.js';
import { setResponse, setErrorResponse} from './response-handler.js';
import multer from "multer";
import Course from '../models/course.js';


//endpoints to get all the available courses
export const findCourse=async (request, response) =>{
    try{
        const searchQuery= {...request.query};
        const courses = await CourseService.searchCourse(searchQuery);
         setResponse(courses,response);
    }catch(err){
        console.log(err);
        setErrorResponse(err,response);
    }
}
//endpoints to create a new course
export const postCourse=async (request, response)=>{
    try{
       const newCourse=request.body;
       
              const course = await CourseService.saveCourse(newCourse);
              setResponse(course, response)
       
        
        
        
    }catch(err){
        setErrorResponse(err,response);
    }
}

export const updateCourse=async(request,response)=>{
    try{
        const updatedCourse=request.params.body;
        const updatedCourseId=request.params._id;
        const modifiedCourse= await CourseService.updateCourse(updatedCourse,updatedCourseId);
        setResponse(modifiedCourse,response);
    }catch{
        setErrorResponse(err,response);
    }
}

export const deleteCourse= async(request,response)=>{
    try{
        const courseId=request.params._id;
        const removedCourse=await CourseService.removeCourse(courseId);
        setResponse(removedCourse,response);
    }catch(err){
        setErrorResponse(err,response);
    }
}