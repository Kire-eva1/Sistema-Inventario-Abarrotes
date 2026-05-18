const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entry.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", authMiddleware.verifyToken, entryController.getAllEntries);
router.post("/", authMiddleware.verifyToken, authMiddleware.checkRole("admin"), entryController.createEntry);

module.exports = router;