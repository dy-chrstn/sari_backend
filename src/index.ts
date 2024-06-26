import mongoose from "mongoose";
require("dotenv").config();
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import router from "./routers";
import cors from "cors";
// import socketIO from "socket.io"; // Import the socket.io module

const port = process.env.PORT || 3051;

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json("Sari Backend");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server running on http://localhost:" + port);
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.set("strictQuery", false);
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use(cors());
app.use("/sari", router());


export default app