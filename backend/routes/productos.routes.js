const express = require('express');

const router = express.Router();

const controller = require('../controllers/productos.controller');


// OBTENER TODOS LOS PRODUCTOS
router.get('/', controller.obtenerProductos);


// OBTENER PRODUCTO POR ID
router.get('/:id', controller.obtenerProductoPorId);


// CREAR PRODUCTO
router.post('/', controller.crearProducto);


// ACTUALIZAR PRODUCTO
router.put('/:id', controller.actualizarProducto);


// ELIMINAR PRODUCTO
router.delete('/:id', controller.eliminarProducto);


module.exports = router;