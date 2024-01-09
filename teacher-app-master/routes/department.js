const router = require('express').Router();
const { celebrate } = require('celebrate');
const departmentController = require('./../controllers/departmentController');

router.route('/create')
  .post(departmentController.createDepartment)

router.route('/view')
  .get(departmentController.viewTeachersDepartment)

module.exports = router;