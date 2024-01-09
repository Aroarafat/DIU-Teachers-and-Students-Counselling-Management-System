const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const signin = {
  body : Joi.object().keys({
    email : Joi.string().email().required(),
    password : Joi.string().required()
  })
}
const createAdmin = {
  body : Joi.object().keys({
      email : Joi.string().email().required(),
      password : Joi.string().required()
  })
}

module.exports = {
  signin,
  createAdmin,
}
