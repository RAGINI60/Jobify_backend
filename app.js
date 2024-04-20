import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors" // connect frontend to the backend without security issues
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import jobRouter from "./routes/jobRouter.js"
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
const app=express();
config({path:"./config/config.env"});

app.use(cors({
    origin:[process.env.https://job-ify.netlify.app/],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
})
);

app.use(cookieParser());   //for the users authorization
app.use(express.json());  // backend related areas
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
})
);

app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter);


dbConnection();
app.use(errorMiddleware);

export default app;
