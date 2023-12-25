import express from "express";
import { checkAuth,checkAuthAdmin } from "../utils/checkAuth.js";
import authRoutes from './auth.js';
import usersRoutes from './users.js';
import tasksRoutes from './tasks.js';
import adminsRoutes from './admins.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', checkAuth, usersRoutes);
router.use('/tasks', checkAuth, tasksRoutes);
router.use('/admins', checkAuth, checkAuthAdmin, adminsRoutes);


export default router;