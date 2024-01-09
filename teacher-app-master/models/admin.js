//models index
const Mongoose = require('./../config/db').Mongoose,
  Schema = Mongoose.Schema;

const adminsSchema = new Schema({
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
    default : "admin"
  }
},{
  timestamps: true
});

const admins = Mongoose.model('admins',adminsSchema);
module.exports = admins;
