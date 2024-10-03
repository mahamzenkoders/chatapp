import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { getDataSource } from "./src/source/data.source";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});

app.use(cors());

io.on("connection", (socket: Socket) => {
  console.log("A user connected");


  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
      await getDataSource();
      console.log("Database connection established successfully");
      
      server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
      process.exit(1); 
    }
  };
  
  startServer();
