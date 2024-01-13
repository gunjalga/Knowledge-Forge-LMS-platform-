import User from '../models/user.js'
import mongoose from 'mongoose';
export const searchUser = async (params={}) => {
    const users = await User.find(params).exec();
    return users;
}

export const saveUser = async (newUser)=>{
    const user = new User(newUser);
    return await user.save();
}

export const updateUser = async(updatedUser,email)=>{
  console.log(updatedUser);
    const user = await User.findOneAndUpdate({email:email},updatedUser,{returnOriginal:false});
    console.log(user);
    return user;
}

export const removeUser = async(id)=>{
    return await User.findByIdAndDelete(id).exec();
}
export const addProgressToCourse = async(email,courseId,moduleNo)=>{
  return await User.findOneAndUpdate({email:email},{"$set":{[`courseProgress.${courseId}`]:moduleNo}});
}
export const getProgress = async(email,courseId)=>{
  return await User.findOne({email:email},{_id:0,[`courseProgress.${courseId}`]:1});
}
export const getOneUser = async(email)=>{
    const result= await User.aggregate([
        {
            $match: {
              email: email,
            },
          },
          {
            $project: {
              userName: 1, // Include the 'username' field
              email: 1,    // Include the 'email' field
              contactNumber: 1,  
              _id: 0,      // Exclude the '_id' field

            },
          },
    ]);
    return result[0];
}
export const registeredCourses = async(email)=>{
    const result= await User.aggregate([
        {
            $match: {
              email: email,
            },
          },
          {
            $lookup:{
                from: "courses",
              localField: "registeredCourses",
              foreignField: "_id",
              as: "myCourses"
            }
          },
          {
            $project: {
              myCourses:1, 
              _id: 0,      // Exclude the '_id' field

            },
          },
    ]);
    return result[0];
}

export const checkIfRegistered = async(email, courseId)=>{
  const result= await User.findOne({email:email})
  if(result.registeredCourses.includes(courseId))
  {
    return true;
  }else{
    return false;
  }
  
}
export const addCourseToUser = async(email, courseId)=>{
  const result= await User.findOne({email:email})
  result.registeredCourses.push(new mongoose.Types.ObjectId(courseId) );
  
  
    return await result.save();
  
  
}