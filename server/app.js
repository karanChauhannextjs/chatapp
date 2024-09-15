import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import ConnectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);
app.get("/", (req, res) => {
  res.send("Hello , World");
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("message", (data) => {
    console.log(data, "message");
    io.to(data?.room).emit("receiveMessage", data);
  });
});

app.listen(process.env.PORT, () => {
  ConnectDB();
  console.log(`server is running on PORT ${process.env.PORT}`);
});
