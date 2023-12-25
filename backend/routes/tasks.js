import express from "express";
import { getAllTasks,getCurrentUserTasks, updateTask } from "../controllers/task.js";

const router = express.Router();

router.get('/all', getAllTasks);


router.put("/:taskId", updateTask);


router.get('/myTasks', getCurrentUserTasks);




export default router;