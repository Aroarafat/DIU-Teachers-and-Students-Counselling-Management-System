const router = require('express').Router();
const { celebrate } = require('celebrate');
const appointmentController = require('./../controllers/appointmentController');
const verifyToken = require('./../middlewares/verifyToken');
const appointmentValidation = require('../validations/appointmentValidations');

router.route('/create')
  .post([
    celebrate(appointmentValidation.createAppointment),
  ],
  appointmentController.createAppointment
  )

router.route('/view/teacher/:teacherId')
  .get(appointmentController.viewTeachersAppointment)

router.route('/view/student/:studentId')
  .get(appointmentController.viewStudentAppointment)

router.route('/approve/:appointmentId')
.get(appointmentController.approvedByTeacher)

router.route('/reject/:appointmentId')
.get(appointmentController.rejectedByTeacher)

// router.route('/rejected/all')
//   .get(appointmentController.rejectedDoctorList)


module.exports = router;