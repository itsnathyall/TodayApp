import express from "express";
import { createTask, getTasks, deleteTask, updateTask, markTaskAsCompleted, reorderTasks } from "../Controllers/taskController.js";

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", updateTask);
router.put("/tasks/:taskId/complete", markTaskAsCompleted);
router.put("/tasks/:userId/order", reorderTasks);
export default router;
