import express from "express";
import {createTask,getCurrentUserTasks,deleteTask,deleteAllTasks,getAllUsers} from '../controllers/admins.js'
const router = express.Router();
router.get('/', getAllUsers);
router.post("/", createTask);
router.get('/myTasks', getCurrentUserTasks);
router.delete('/deleteAll', deleteAllTasks);
router.delete('/:taskId', deleteTask);
export default router;