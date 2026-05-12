const express = require('express');
const router = express.Router();

const controller = require('../controllers/alertas.controller');

router.get('/', controller.obtenerAlertas);

module.exports = router;