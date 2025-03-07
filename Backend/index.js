import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
const app = express();
dotenv.config();

import userRouter from "./routes/userRoutes.js";
import companyRouter from "./routes/companyRoute.js";
import jobRouter from "./routes/jobRoute.js";
import applicationRouter from "./routes/applicationRoute.js";

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

const PORT = process.env.PORT_NO;
app.listen(PORT, () => {
  connectDB();
  console.log(`Listening to PORT NO. ${PORT}`);
});
