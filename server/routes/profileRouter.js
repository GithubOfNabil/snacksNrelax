import express from "express";
import { handleName } from "../controllers/profileController.js";

const profileRouter = express.Router();


profileRouter.get("/name", handleName)


export {profileRouter};