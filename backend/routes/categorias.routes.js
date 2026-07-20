const express = require("express");

const router = express.Router();

const categoriasController = require("../controllers/categorias.controller");



// ================= CATEGORÍAS =================



// Obtener todas las categorías
router.get(
    "/",
    categoriasController.obtenerCategorias
);



// Crear nueva categoría
router.post(
    "/",
    categoriasController.crearCategoria
);



module.exports = router;