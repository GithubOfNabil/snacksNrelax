import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/authRouter.js";
import {connectMongoDB} from "./connect.js"
import { profileRouter } from "./routes/profileRouter.js";
import { restictToLogInOnly } from "./middlewares/authMiddleware.js";
import getYtVideos from "./services/ytScrapper.js";
import getIgVideos from "./services/igScrapper.js";



const app = express();
const PORT = process.env.PORT

connectMongoDB(process.env.DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(`MonogDB crashed err: ${err}`))



app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



app.use('/auth', authRouter);
app.use('/profile',restictToLogInOnly, profileRouter);


// getYtVideos();
// getIgVideos();
// app.get('/test', youtubeScrapper);



app.listen(PORT, () => console.log(`Server started on port ${PORT}`))