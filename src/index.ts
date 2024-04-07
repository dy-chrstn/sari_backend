require("dotenv").config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import router from "./routers";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(
    PORT,
    () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    }
)

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/sari";

mongoose.set("strictQuery", false);
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
// mongoose.connection.once("open", () => console.log("MongoDB connected"));

app.use(router);