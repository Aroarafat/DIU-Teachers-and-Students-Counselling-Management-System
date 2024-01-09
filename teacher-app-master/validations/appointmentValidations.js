const { Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const createAppointment = {
  body: Joi.object().keys({
    studentId: Joi.string().required(),
    teacherId: Joi.string().required(),
    slot: Joi.string().required(),
    reason: Joi.string(),
  })
}

module.exports = {
  createAppointment,
}
