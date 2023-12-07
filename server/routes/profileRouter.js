import express from "express";
import { handleName } from "../controllers/profileController.js";
import { handleContentAdd, handleContentServe } from "../controllers/profileController.js";


const profileRouter = express.Router();


profileRouter.get("/name", handleName)
    .get("/content/serve", handleContentServe)
    .post("/content/add", handleContentAdd)


export { profileRouter };