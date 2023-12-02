import express from "express";
import cors from "cors"
import { authRouter } from "./routes/authRouter.js";



const app = express();
const PORT = process.env.PORT

connectMongoDB(process.env.DB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(`MonogDB crashed err: ${err}`))



app.use(cors());
app.use(express.json())



app.use('/auth', authRouter)



app.listen(PORT, () => console.log(`Server started on port ${PORT}`))