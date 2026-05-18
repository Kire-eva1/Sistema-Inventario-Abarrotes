const express = require("express");
const router = express.Router();
const exitController = require("../controllers/exit.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware.verifyToken, exitController.getAllExits);
router.post("/", authMiddleware.verifyToken, authMiddleware.checkRole("admin"), exitController.createExit);

module.exports = router;