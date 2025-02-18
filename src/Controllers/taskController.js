import Task from ('./src/Models/tasksModel');


exports.createTask = async (req,res) =>{
    try {
        const task = new Task({...req.body, user: req.user.id});
        await task.save();
        res.status(201).json(task);
    } catch(err){
        res.status(500).json({error: err.msg});
    };
};

exports.getTasks = async(req,res) => {
    try {
        const tasks = await Task.find({user: req.user.id});
        res.json(tasks);
    }catch(err){
        res.status(500).json({error: err.msg})
    }
}