import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { getDataSource } from "./src/source/data.source";
import { Room } from "./src/app/entity/Room";
import { getTokenData } from "./src/utils/helpers.util";


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

  socket.on("CREATE_ROOM", async ({ roomName, participants, createdBy }) => {

    
    try {
        const headers = socket.handshake?.headers?.authorization?.split(' ')[1];
     const token = await getTokenData(headers || '');
      const connection = await getDataSource();
      const roomRepository = connection.getRepository(Room);

      const room = new Room();
      room.name = roomName;
      room.participants = participants; 
      room.createdBy = token.id;

      const savedRoom = await roomRepository.save(room);
      console.log("Room created:", savedRoom);

      socket.emit("ROOM_CREATED", savedRoom);
    } catch (err) {
      console.error("Error: Failed to create room", err);
      socket.emit("ERROR", "Failed to create room.");
    }
  });

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
