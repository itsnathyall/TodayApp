import {mongoose} from ('mongoose');

const taskSchema = new mongoose.Schema({
    task:{type:String, required:true,unique: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    doneAt: {type: Date, default: Date.now}
});

export const Task = mongoose.model('Tasks', taskSchema);