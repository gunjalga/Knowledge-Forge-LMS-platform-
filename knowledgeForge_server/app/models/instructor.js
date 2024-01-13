// Importing mongoose for creating schemas and models
import mongoose from "mongoose";

// Creating a schema using mongoose.Schema
const schema = mongoose.Schema;

// Defining the instructor schema with specified fields and their types
const instructorSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  // profile_picture: {
  //   type: String,
  //   required: true,
  // },
  contactNumber: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  myCourses:{
    type: Array,
    required: false,
  }
  
  
},
{
  // Excluding the version key from the schema
  versionKey: false
});

// Creating a mongoose model named 'Instructor' based on the defined schema
const Instructor = mongoose.model('instructor', instructorSchema);

// Exporting the Instructor model for use in other files
export default Instructor;