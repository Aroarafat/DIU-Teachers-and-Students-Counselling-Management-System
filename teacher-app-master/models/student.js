//models index
const Mongoose = require('./../config/db').Mongoose,
  Schema = Mongoose.Schema;

const studentsSchema = new Schema({
  name: {
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
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    default: "student"
  },
  profilePic: {
    type: String,
    default: ""
  },
  idNo: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

const students = Mongoose.model('students', studentsSchema);
module.exports = students;
