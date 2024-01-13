import bcrypt from 'bcryptjs';
import { response } from 'express';
import {saveInstructor} from '../services/instructor-service.js';
import { saveUser } from '../services/user-service.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { setResponse,setErrorResponse } from './response-handler.js';
import Instructor from '../models/instructor.js';


export const registerInstructor = async (request, response) => {
    try {
        
        const newInstructor = request.body;
        const newPassword = await bcrypt.hash(newInstructor.password, 10)
        
        newInstructor.password=newPassword;
        
        
        const instructor = await saveInstructor(newInstructor);

        
        setResponse(instructor, response);
    } catch (err) {
        
        setErrorResponse(err, response);
    }
};

export const registerUser = async (request, response) => {
    try {
        
        const newUser = request.body;
        
        const newPassword = await bcrypt.hash(newUser.password, 10)
        console.log(newPassword);
        newUser.password=newPassword;
        

        
        const instructor = await saveUser(newUser);

       
        setResponse(instructor, response);
    } catch (err) {
        
        setErrorResponse(err, response);
    }
};

export const loginUser = async (request, response) => {
    try {
        const user = await User.findOne({
            email: request.body.email,
        });
        if (!user) {
            response.status(404).send( { status: 'error', error: 'user doesn\'t exist' });;
            
        }else{
            const isPasswordValid = await bcrypt.compare(
                request.body.password,
                user.password
            )
            if (isPasswordValid) {
                const token = jwt.sign(
                    {
                        name: user.name,
                        email: user.email,
                    },
                    'secret123',
                    { expiresIn: '4h' }
                )
                const sanitizedUser ={
                    userName: user.userName,
  email: user.email,
  contactNumber: user.contactNumber,
                }
                response.cookie('token', token, { httpOnly: true, sameSite: 'Strict' });
                response.json({ message: 'Login successful', sanitizedUser });
            } else {
                 response.json({ status: 'error', user: false })
            }
        }
        
      
    } catch (err) {
        // Set error response
        setErrorResponse(err, response);
    }
};

export const loginInstructor = async (request, response) => {
    try {
        const instructor = await Instructor.findOne({
            email: request.body.email,
        });
        if (!instructor) {
            response.send( { status: 'error', error: 'instructor doesn\'t exist' });
        }else{
            const isPasswordValid = await bcrypt.compare(
                request.body.password,
                instructor.password
            )
            if (isPasswordValid) {
                const token = jwt.sign(
                    {
                        name: instructor.name,
                        email: instructor.email,
                    },
                    'secret123',
                    { expiresIn: '4h' }
                )
                response.cookie('token', token, { httpOnly: true });
                response.json({ message: 'Login successful', instructor });
            } else {
                 response.json({ status: 'error', user: false })
            }
        }
        
      
    } catch (err) {
        // Set error response
        setErrorResponse(err, response);
    }
};

export const logout = async(request,response)=>{
    try {
        response.clearCookie('token',{ httpOnly: true, sameSite: 'Strict',maxAge:0 });
        response.json({  message: 'Logged out successfully' });
    } catch (error) {
        setErrorResponse(error, response);
    }
}