import express from "express";
import { createTask, getTasks, deleteTask, updateTask, markTaskAsCompleted, reorderTasks } from "../Controllers/taskController.js";
import { registerUser, loginUser, getUserProfile, forgotPassword, resetPassword } from "../Controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// routes for authentication
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

//routes for tasks
router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);
router.put("/tasks/:taskId/complete", markTaskAsCompleted);
router.put("/tasks/:userId/order", reorderTasks);
export default router;
