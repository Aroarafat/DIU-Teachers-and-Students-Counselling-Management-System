const router = require('./index');

const teacherApp = (app) => {
  app.use('/api/v1', router.initial);
  
  app.use('/api/v1/admin', router.admin);
  app.use('/api/v1/teacher', router.teacher);
  app.use('/api/v1/student', router.student);
  app.use('/api/v1/appointment', router.appointment);
  app.use('/api/v1/department', router.department);
  app.use('/api/v1/notice', router.notice);
}


module.exports = teacherApp;
