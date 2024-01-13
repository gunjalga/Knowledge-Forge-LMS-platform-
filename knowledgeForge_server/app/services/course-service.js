import Course from '../models/course.js'
import multer from "multer";
const storage = multer.memoryStorage();
const uploadImage = multer({ storage: storage });
export const searchCourse = async (params={}) => {
    const courses=await  Course.find(params).exec();
   
    return courses;
}

export const saveCourse = async (course)=>{
    
    const newCourse = new Course(course);
    
    return await newCourse.save().catch((err)=>{
        console.log(err);
    });
}

export const updateCourse = async(updatedCourse,id)=>{
    const course = await Course.findByIdAndUpdate(id,updatedCourse).exec();
    return course;
}

export const removeCourse = async(id)=>{
    return await Course.findByIdAndDelete(id).exec();
}