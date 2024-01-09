const router = require('express').Router();
const initialController = require('../controllers/initial');

router
    .get('/', initialController.initialMessage);


module.exports = router;
