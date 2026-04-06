const express = require("express");
const router = express.Router();
const postController = require("../controllers/postControllers");
const protect = require("../middleware/authMiddleware");

// router.post("/") corresponds to fetch(".../api/projects")
router.post("/", protect, postController.createPost);
router.get("/user/:userId", protect, postController.getAllPosts);
router.get("/:id", protect, postController.getPostById);
router.put("/:id", protect, postController.updatePost);
router.delete("/:id", protect, postController.deletePost);

module.exports = router;