import express from "express";
import { isLoggedIn, login, logout, register,isAdmin } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.get("/logout", logout);

router.get('/is_logged_in', isLoggedIn)
router.get('/is_admin', isAdmin)

export default router;