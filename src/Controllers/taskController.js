import { Tasks } from "../Models/tasksModel.js";
import mongoose from "mongoose";

export const createTask = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : new mongoose.Types.ObjectId();
        const taskData = {
            ...req.body,
            user: userId,
            estimatedTime: req.body.estimatedTime || "defaultEstimatedTime",
            task: req.body.task || "defaultTask"
        };
        const task = new Tasks(taskData);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTasks = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : new mongoose.Types.ObjectId();
        const tasks = await Tasks.find({ user: userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};