import express from "express";
import { handleSignup, handleLogin, handleLogout } from "../controllers/authController.js";


const authRouter = express.Router();


authRouter.post('/signup', handleSignup)
    .post('/login', handleLogin)
    .get('/logout', handleLogout)

export { authRouter };