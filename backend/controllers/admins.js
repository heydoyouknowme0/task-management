import User from '../models/User.js';
import Task from '../models/Task.js';
import { createError } from '../utils/error.js';


export const createTask = async (req, res, next) => {
    const { title, content,dueDate, subTasks,assigned } = req.body;
    const userId = req.user.id;
  
    const newTask = new Task({
      title,
      user: userId,
      teamCode:req.user.teamCode,
      content: content || '',
      dueDate,
      subTasks: subTasks || [], 
      assigned:assigned || [],
    });
  
    try {
      const savedTask = await newTask.save();
      const savedTaskWithAssigned = await Task.findById(savedTask._id).populate('assigned', 'name');
      res.status(200).json(savedTaskWithAssigned);
    } catch (err) {
      next(err);
    }
  };
export const getCurrentUserTasks = async (req, res, next) => {
    try {
      const tasks = await Task.find({ teamCode:req.user.teamCode}).sort({ dueDate: 'desc' }).populate('assigned', 'name');
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  };

  export const deleteTask = async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.taskId);
      if (task.user === req.user.id) {
        return next(createError({ status: 401, message: "It's not your todo." }));
      }
      await Task.findByIdAndDelete(req.params.taskId);
      return res.json('Task Deleted Successfully');
    } catch (err) {
      return next(err);
    }
  };
  
  export const deleteAllTasks = async (req, res, next) => {
    try {
      await Task.deleteMany({ user: req.user.id });
      res.json('All Todo Deleted Successfully');
    } catch (err) {
      next(err);
    }
  };
  export const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.find({teamCode:req.user.teamCode}).select('_id name');
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };