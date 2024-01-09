const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const signin = {
  body : Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required()
  })
}
const registerStudent = {
  body : Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
      name: Joi.string().required(),
      age: Joi.number().required(),
      gender: Joi.string().required(),
      phone: Joi.string().required(),
      idNo: Joi.string().required(),
  })
}

module.exports = {
  signin,
  registerStudent,
}
