const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // ✅ NEW

const { 
    signupUser, 
    loginUser, 
    saveCanvasData, 
    updateCanvasData, 
    deleteWork, 
    renameWork 
} = require("../controllers/userControllers");

// PUBLIC routes (no token needed)
router.post("/signup", signupUser);
router.post("/login", loginUser);

// PROTECTED routes (token required) ✅
router.post("/save-canvas", authMiddleware, saveCanvasData);
router.patch("/update-canvas", authMiddleware, updateCanvasData);
router.post("/delete-canvas", authMiddleware, deleteWork);
router.patch("/rename-canvas", authMiddleware, renameWork);

module.exports = router;