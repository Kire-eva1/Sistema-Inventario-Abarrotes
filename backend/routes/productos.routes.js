const express = require("express");

const router = express.Router();

const productosController = require("../controllers/productos.controller");



// ================= PRODUCTOS =================



// Obtener todos los productos
router.get(
    "/",
    productosController.obtenerProductos
);



// Obtener producto por ID
router.get(
    "/:id",
    productosController.obtenerProductoPorId
);



// Crear producto
router.post(
    "/",
    productosController.crearProducto
);



// Actualizar producto
router.put(
    "/:id",
    productosController.actualizarProducto
);



// Eliminar producto
router.delete(
    "/:id",
    productosController.eliminarProducto
);



module.exports = router;