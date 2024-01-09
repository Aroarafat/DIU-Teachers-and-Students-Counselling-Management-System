const { ObjectId } = require('mongoose');

//models index
const Mongoose = require('./../config/db').Mongoose,
  Schema = Mongoose.Schema;

const departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true,
  },
},{
  timestamps: true
});

const departments = Mongoose.model('departments', departmentSchema);
module.exports = departments;
