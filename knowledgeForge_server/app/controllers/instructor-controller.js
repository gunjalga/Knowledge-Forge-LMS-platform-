// Importing necessary modules and functions
import { response } from 'express';
import * as InstructorService from '../services/instructor-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';
import jwt from 'jsonwebtoken';
import { updateCourse } from './course-contoller.js';

// Find instructors controller
export const findInstructor = async (request, response) => {
    try {
        // Extract search parameters from the request
        const searchQuery = { ...request.query };

        // Call service to find instructors
        const instructors = await InstructorService.searchInstructor(searchQuery);

        // Set response using helper function
        setResponse(instructors, response);
    } catch (err) {
        // Log and set error response
        console.log(err);
        setErrorResponse(err, response);
    }
};

// Create new instructor controller
export const postInstructor = async (request, response) => {
    try {
        // Extract new instructor data from the request body
        const newInstructor = request.body;

        // Call service to save new instructor
        const instructor = await InstructorService.saveInstructor(newInstructor);

        // Set response using helper function
        setResponse(instructor, response);
    } catch (err) {
        // Set error response
        setErrorResponse(err, response);
    }
};

// Update existing instructor controller
export const putInstructor = async (request, response) => {
    const token = request.cookies.token;
    
    if (!token) {
        return response.status(401).json({ message: 'Unauthorized' });
      }
    try {
        // Extract instructor ID and updated data from the request
        
        const updatedInstructor = request.body;
        
        const instructor = jwt.verify(token, 'secret123');
        
        // Call service to update instructor
        const result = await InstructorService.updateInstructor(updatedInstructor, instructor.email);

        // Set response using helper function
        setResponse(result, response);
    } catch (err) {
        // Set error response
        setErrorResponse(err, response);
    }
};

// Delete existing instructor controller
export const deleteInstructor = async (request, response) => {
    try {
        // Extract instructor ID from the request
        const instructorId = request.params.id;

        // Call service to remove instructor
        const result = await InstructorService.removeInstructor(instructorId);

        // Set response using helper function
        setResponse(result, response);
    } catch (err) {
        // Set error response
        setErrorResponse(err, response);
    }
};

export const getOneInsrtuctor = async (request, response) => {
    const token = request.cookies.token;
    
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const instructor = jwt.verify(token, 'secret123');
        
        const result = await InstructorService.getOneInsrtuctor(instructor.email);
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

export const getInstructorCourses = async (request, response) => {
    const token = request.cookies.token;
    
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const instructor = jwt.verify(token, 'secret123');
        
        const result = await InstructorService.getCourses(instructor.email);
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}
export const addCourseToInstructor = async (request, response) => {
    const token = request.cookies.token;
    const courseId = request.params.id;
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const instructor = jwt.verify(token, 'secret123');
        
        const result = await InstructorService.addCourse(instructor.email,courseId);
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

