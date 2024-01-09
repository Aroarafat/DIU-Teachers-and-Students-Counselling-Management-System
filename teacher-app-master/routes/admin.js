const router = require('express').Router();
const { celebrate } = require('celebrate');
const adminController = require('./../controllers/adminController');
const verifyToken = require('./../middlewares/verifyToken');
const userPermission = require('./../middlewares/permission');
const adminValidation = require('../validations/adminValidations');

router.route('/create')
  .post([
    celebrate(adminValidation.createAdmin),
    // verifyToken,userPermission('admin')
  ], adminController.createAdmin)

router.route('/signin')
  .post([
    celebrate(adminValidation.signin)
  ], adminController.signIn)

router.route('/password-update')
  .post([
    verifyToken,
    // celebrate(adminValidation.signin)
  ], adminController.adminUpdatePassword)

router.route('/all')
  .get(adminController.viewAllAdmin)

router.route('/remove/:id')
  .delete(adminController.removeAdmin)

router.route('/approve/teacher/:teacherId')
  .get(adminController.approveTeacherByAdmin)

router.route('/reject/teacher/:teacherId')
  .get(adminController.rejectTeacherByAdmin)

  router.route('/dashboard')
  .get(adminController.dashboardView)

module.exports = router;
