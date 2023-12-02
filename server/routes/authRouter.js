import express from "express";
import { handleSignUp, handleLogIn, handleLogOut } from "../controllers/authController.js";


const authRouter = express.Router();


authRouter.post('/signup', handleSignUp)
    .post('/login', handleLogIn)
    .get('/logout', handleLogOut)

export { authRouter };