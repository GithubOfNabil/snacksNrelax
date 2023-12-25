import express from "express";
import { handleName } from "../controllers/profileController.js";
import { handleContentAdd, handleYoutubeServe, handleInstagramServe } from "../controllers/profileController.js";


const profileRouter = express.Router();


profileRouter.get("/name", handleName)
    .get("/content/serve/youtube", handleYoutubeServe)
    .get("/content/serve/instagram", handleInstagramServe)
    .post("/content/add", handleContentAdd)


export { profileRouter };