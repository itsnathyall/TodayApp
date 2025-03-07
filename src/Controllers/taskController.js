import { Tasks } from "../Models/tasksModel.js";
import Tasks from "../Models/taskModel.js"; // Make sure this path is correct




//addd new tasks



export const createTask = async (req, res) => {
  try {

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User ID not found in request" });
    }

    const userId = req.user._id;
    console.log("Creating task for User ID:", userId);

    const { task, estimatedTime, isList, listItems } = req.body;


    if (!task) {
      return res.status(400).json({ error: "Task name is required" });
    }


    const lastTask = await Tasks.findOne({ user: userId }).sort("-order");
    const newOrder = lastTask ? lastTask.order + 1 : 0;


    const newTask = new Tasks({
      user: userId,
      task,
      estimatedTime,
      isList: isList || false,
      listItems: isList ? listItems || [] : [],
      order: newOrder
    });

    await newTask.save();
    console.log("Task Created:", newTask);

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Task Creation Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};



//Get all the task of speicfif user
export const getTasks = async (req, res) => {
    try {
        const userId = req.user?.id;
        const tasks = await Tasks.find({ user: userId }).sort("order");
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



//mark tasks as completed

export const markTaskAsCompleted = async (req, res) => {
    try{
        const {taskId} = req.params;
        const task = await Tasks.findOneAndUpdate(
            {_id: taskId, user: mockUserId},
            {status: "completed", completedAt: new Date()},
            {new: true}
        );
        if(!task) return res.status(404).json({error: "Task not found"});
        res.status(200).json(task);
    }catch (err){
        res.status(500).json({error: err.message});
    }
}

//update task

export const updateTask = async (req, res) => {
    try{
        const {taskId} = req.params;
        const {task, estimatedTime, isList, listItems} = req.body;
        const updatedTask = await Tasks.findOneAndUpdate(
            {_id: taskId, user: mockUserId},
            {task, estimatedTime, isList, listItems},
            {new: true}
        );
        if(!updatedTask) return res.status(404).json({error: "Task not found"});
        res.status(200).json(updatedTask);
    }catch(err){
        res.status(500).json({error: err.message});
    }
}


//delete tasks fr

export const deleteTask = async (req,res) =>{
    try {
        const {taskId} = req.params;
        const task = await Tasks.findOneAndDelete({_id: taskId, user: mockUserId});
        if(!task) return res.status(404).json({error: "Task not found"});
    }catch(err){
        res.status(500).json({error: err.message});
    }
}