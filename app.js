import express from "express";
import dotenv from "dotenv";
import indexRouter from "./routes/index.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

// Need to set up authentication middleware with jwt and passport

app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
