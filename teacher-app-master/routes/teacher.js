const router = require('express').Router();
const { celebrate } = require('celebrate');
const teacherController = require('./../controllers/teacherController');
const verifyToken = require('./../middlewares/verifyToken');
const teacherValidations = require('../validations/teacherValidations');

router.route('/register')
  .post([
    celebrate(teacherValidations.registerDoctor),
  ],
    teacherController.registerTeacher
  )
router.route('/signin')
  .post([
    celebrate(teacherValidations.signin)
  ],
    teacherController.signIn
  )
router.route('/update-password')
  .post(teacherController.teacherUpdatePassword)

router.route('/approved/all')
  .get(teacherController.approvedTeacherList)

router.route('/pending/all')
  .get(teacherController.pendingTeacherList)

router.route('/rejected/all')
  .get(teacherController.rejectedTeacherList)

router.route('/view/teacher/:department')
  .get(teacherController.departmentWiseTeacherList)

router.route('/update-profile')
  .post(teacherController.teacherUpdateProfile)

router.route('/view-profile/:teacherId')
  .get(teacherController.teacherViewProfile)


module.exports = router;