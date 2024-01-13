import { response } from 'express';
import * as UserService from '../services/user-service.js'
import { setResponse, setErrorResponse} from './response-handler.js'
import  jwt  from 'jsonwebtoken';

export const findUser = async (request, response) =>{
    
    try{
        const searchQuery = {...request.query};
        const users = await UserService.searchUser(searchQuery);
        setResponse(users,response);
    }catch(err){
        console.log(err);
        setErrorResponse(err,response);
    }
}
//create a new user
export const postUser = async (request, response)=>{
    try {
        const newUser = request.body;
        const user = await UserService.saveUser(newUser);
        setResponse(user, response)
    } catch(err) {
        setErrorResponse(err,response);
    }
}
//update a user's details
export const putUser = async (request, response) => {
    const token = request.cookies.token;
    
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const user = jwt.verify(token, 'secret123');
        console.log(request.body);
        const updatedUser = request.body;
        const result = await UserService.updateUser(updatedUser, user.email);
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}

export const deleteUser = async (request, response) => {
    try {
        const userId = request.params.id;
        const result = await UserService.removeUser(userId);
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}
export const getOneUser = async (request, response) => {
    const token = request.cookies.token;
    
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const user = jwt.verify(token, 'secret123');
        const result = await UserService.getOneUser(user.email);
        
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}
//get all registered courses for a user
export const getRegisteredCourses = async (request, response) => {
    const token = request.cookies.token;
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const user = jwt.verify(token, 'secret123');
        const result = await UserService.registeredCourses(user.email);
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}
// check if the user is enrolled into a course
export const checkRegistration = async (request, response) => {
    const courseId = request.params.id;
    const token = request.cookies.token;
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const user = jwt.verify(token, 'secret123');
        const result = await UserService.checkIfRegistered(user.email, courseId);
        if(result){
            response.status(200).json({registered:true});
        }
        else{
            response.status(401).json({registered:false});
        }
    } catch (err) {
        setErrorResponse(err, response);
    }
}
//endpoint to register a user in a course
export const registerInCourse = async (request, response) => {
    const courseId = request.params.id;
    const token = request.cookies.token;
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const user = jwt.verify(token, 'secret123');
        
            const result = await UserService.addCourseToUser(user.email, courseId);
        setResponse(result, response);
        await UserService.addProgressToCourse(user.email, courseId,0)
        
    } catch (err) {
        setErrorResponse(err, response);
    }
}
// update progress for a particular course
export const updateCourseProgress= async (request, response) => {
    
    const token = request.cookies.token;
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const user = jwt.verify(token, 'secret123');
        
        const courseId=request.body.courseId;
        const moduleNo=request.body.moduleNo;
        const result = await UserService.addProgressToCourse(user.email, courseId,moduleNo);
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}
//get progress for a particular course
export const getCourseProgress = async (request, response) => {
    
    const token = request.cookies.token;
        if (!token) {
            return response.status(401).json({ message: 'Unauthorized' });
          }
    try {
        const user = jwt.verify(token, 'secret123');
        
        const courseId=request.params.id;
        
        const result = await UserService.getProgress(user.email, courseId);
        setResponse(result, response);
    } catch (err) {
        setErrorResponse(err, response);
    }
}
