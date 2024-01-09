const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const signin = {
  body : Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required()
  })
}
const registerDoctor = {
  body : Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
    name: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    teacherId: Joi.string().required(),
    department: Joi.string().required(),
    profileImage: Joi.string(),
    education: Joi.string(),
    experience: Joi.string(),
  })
}

module.exports = {
  signin,
  registerDoctor,
}
