const { ObjectId } = require('mongoose');

//models index
const Mongoose = require('./../config/db').Mongoose,
  Schema = Mongoose.Schema;

const appointmentsSchema = new Schema({
  studentId: {
    type: ObjectId,
    required: true,
  },
  teacherId: {
    type: ObjectId,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    default: ""
  },
  isApprovedByTeacher: {
    type: Boolean,
    default: false,
  },
  isRejectedByTeacher: {
    type: Boolean,
    default: false,
  }
},{
  timestamps: true
});

const appointments = Mongoose.model('appointments', appointmentsSchema);
module.exports = appointments;
