import Task from '../models/Task.js';
import { createError } from '../utils/error.js';




export const updateTask = async (req, res, next) => {
  try {
    console.log(req.params.taskId);
    const task = await Task.findById(req.params.taskId).exec();
    if (!task) return next(createError({ status: 404, message: 'Task not found' }));
    if ((task.user.toString() !== req.user.id) && (!task.assigned.some(userId => userId.toString() === req.user.id))) return next(createError({ status: 401, message: "It's not your todo." }));
    console.log(req.body);
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
      title:req.body.title,
      content: req.body.content,
      dueDate: req.body.dueDate,
      status: req.body.status,
      assigned: req.body.assigned,
      subTasks: req.body.subTasks, 
      
    }, { new: true }).populate('assigned', 'name')
    return res.status(200).json(updatedTask);
  } catch (err) {
    return next(err);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};


export const getCurrentUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({assigned:{$in:req.user.id}}).sort({ dueDate: 'desc' }).populate('assigned', 'name');
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};



