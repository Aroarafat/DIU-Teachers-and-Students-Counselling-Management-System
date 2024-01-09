const router = require('express').Router();
const { celebrate } = require('celebrate');
const noticeController = require('./../controllers/noticeController');

router.route('/create')
  .post(noticeController.createNotice)

router.route('/view')
  .get(noticeController.viewNotice)

module.exports = router;