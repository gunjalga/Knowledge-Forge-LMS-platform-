import mongoose from "mongoose";

const schema = mongoose.Schema;

const courseSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  noOfModules: {
    type: Number,
    required: true,
  },
  creationTime: {
    type: String,
    required: true,
  },
  avg_star_rating:{
    type: Number,
    required: false,
  },
  // moduleIDs:{
  //   type:Array,
  //   required:false
  // }
},
{
  versionKey: false
}
);

const Course = mongoose.model('courses', courseSchema);

export default Course;