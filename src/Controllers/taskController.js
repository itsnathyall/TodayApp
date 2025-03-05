import { Tasks } from "../Models/tasksModel.js";




//addd new tasks
export const createTask = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ 
                error: "Unauthorized: req.user is undefined",
                debug: "Make sure auth middleware is working"
            });
        }

        const userId = req.user._id;
        if (!userId) {
            return res.status(401).json({ 
                error: "Unauthorized: User ID not found",
                debug: req.user // This will return the user object in response
            });
        }

        res.status(200).json({ message: "Authentication successful", user: req.user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//Get all the task of speicfif user
export const getTasks = async (req, res) => {
    try {
        const userId = req.user?._id;
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