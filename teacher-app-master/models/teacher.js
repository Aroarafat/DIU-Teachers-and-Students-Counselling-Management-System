//models index
const Mongoose = require('./../config/db').Mongoose,
  Schema = Mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  teacherId: {
    type: String,
    required: true,
    unique: true,
  },
  email : {
    type : String,
    trim : true,
    required : true,
    unique : true,
    index : true
  },
  password : {
    type : String,
    required : true,
    trim : true
  },
  role : {
    type : String,
    required : true,
    default : "teacher"
  },
  isApproved : {
    type : Boolean,
    required : true,
    default: false
  },
  isRejected: {
    type : Boolean,
    required : true,
    default: false
  },
  profileImage: {
    type: String,
    default: '',
  },
  education: {
    type: String,
    default: '',
  },
  experience: {
    type: String,
    default: '',
  },
},{
  timestamps: true
});

const teachers = Mongoose.model('teachers', teacherSchema);
module.exports = teachers;
