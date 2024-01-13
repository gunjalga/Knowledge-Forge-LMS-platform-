// Importing the 'Instructor' model
import Course from '../models/course.js';
import Instructor from '../models/instructor.js';
import mongoose from 'mongoose';

// Function to search for instructors based on specified parameters
export const searchInstructor = async (params = {}) => {
    // Using the 'find' method to retrieve instructors based on the provided parameters
    const instructors = await Instructor.find(params).exec();
    return instructors;
}

// Function to save a new instructor
export const saveInstructor = async (newInstructor) => {
    
    // Creating a new instance of the 'Instructor' model with the provided data
    const instructor = new Instructor(newInstructor);
    
    // Saving the new instructor to the database
    return await instructor.save().catch((err)=>{
      console.log(err.toString());
    });
}

// Function to update an existing instructor based on the provided ID
export const updateInstructor = async (updatedInstructor, email) => {
    // Using the 'findByIdAndUpdate' method to update the instructor
    const instructor = await Instructor.findOneAndUpdate({email:email},updatedInstructor,{returnOriginal:false});
    return instructor;
}

// Function to remove an existing instructor based on the provided ID
export const removeInstructor = async (id) => {
    // Using the 'findByIdAndDelete' method to delete the instructor
    return await Instructor.findByIdAndDelete(id).exec();
}
export const getOneInsrtuctor = async(email)=>{
    const result= await Instructor.aggregate([
        {
            $match: {
              email: email,
            },
          },
          {
            $project: {
              name: 1, // Include the 'username' field
              email: 1,    // Include the 'email' field
              contactNum: 1,  
              university: 1,
              _id: 0,      // Exclude the '_id' field

            },
          },
    ]);
    console.log(result);
    return result[0];
}
export const getCourses = async(email)=>{

    const result= await Instructor.aggregate([
        {
            $match: {
              email: email,
            },
          },
          {
            $lookup:{
                from: "courses",
              localField: "myCourses",
              foreignField: "_id",
              as: "courses"
            }
          },
          {
            $project: {
              courses:1,
              _id: 0,      // Exclude the '_id' field

            },
          },
    ]);
    return result[0];
}
export const addCourse = async (email,courseId) => {
  // Using the 'findByIdAndDelete' method to delete the instructor
  return await Instructor.findOneAndUpdate({email:email},{$push:{myCourses:new mongoose.Types.ObjectId(courseId)}},{returnOriginal:false});
}