const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");



// ================= AUTENTICACIÓN =================


// Login de usuarios
router.post(
    "/login",
    authController.login
);


// Registro de usuarios
router.post(
    "/register",
    authController.register
);



module.exports = router;