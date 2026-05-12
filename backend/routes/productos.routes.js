const express = require('express');
const router = express.Router();

const controller = require('../controllers/productos.controller');

router.get('/', controller.obtenerProductos);
router.post('/', controller.crearProducto);

module.exports = router;