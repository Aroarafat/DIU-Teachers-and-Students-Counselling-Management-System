const router = require('express').Router();
const { celebrate } = require('celebrate');
const studentController = require('./../controllers/studentController');
const verifyToken = require('./../middlewares/verifyToken');
const studentValidation = require('../validations/studentValidations');

router.route('/register')
  .post([
    celebrate(studentValidation.registerStudent),
  ],
  studentController.registerStudent
  )
router.route('/signin')
  .post([
    celebrate(studentValidation.signin)
  ],
  studentController.signIn
  )
router.route('/update-password')
  .post([
    verifyToken
  ],
  studentController.studentUpdatePassword
  )

router.route('/update-profile')
  .post(studentController.studentUpdateProfile)

router.route('/view-profile/:studentId')
  .get(studentController.studentViewProfile)

module.exports = router;