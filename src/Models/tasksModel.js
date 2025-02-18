import {mongoose} from "mongoose";

const taskSchema = new mongoose.Schema({
    task: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    addedAt: { type: Date, default: Date.now },
    isDone: { type: Boolean, default: false },
    estimatedTime: { type: Number, required: true },
    items: [{name: { type: String, required: true },completed: { type: Boolean, default: false }}]
});

export const Task = mongoose.model("Tasks")