import mongoose from "mongoose";
import Module from "../models/modules.js";
import Course from "../models/course.js";


//method to save new module to database
export const save=async(newModule)=>{
    const module = new Module(newModule);
    return await module.save();
};

//method to remove a module from database uisng ID
export const remove = async(id)=>{
    return await Module.findByIdAndDelete(id).exec();
}

//method to get a particular module from database uisng ID
export const findById=async(id)=>{
    
    return await  Module.findById(id);
    
}

export const getModules = async(courseId)=>{
    
    const result = await Module.find().where({courseId:courseId}).sort([['module_no',1]]);
    return result;
}