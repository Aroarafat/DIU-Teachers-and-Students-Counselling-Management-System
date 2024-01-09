const { ObjectId } = require('mongoose');

//models index
const Mongoose = require('./../config/db').Mongoose,
  Schema = Mongoose.Schema;

const noticeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  deactivateTime: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true
});

const notices = Mongoose.model('notices', noticeSchema);
module.exports = notices;
