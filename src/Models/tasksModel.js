import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    task: { type: String, required: true },
    estimatedTime: { type: String, default: "Not specified" },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    isList: { type: Boolean, default: false },
    listItems: [{ name: String, completed: Boolean }],
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date }
});


TaskSchema.index({ completedAt: 1 }, { expireAfterSeconds: 604800 });

export const Tasks = mongoose.model("Tasks", TaskSchema);
