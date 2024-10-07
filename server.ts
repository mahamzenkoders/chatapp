import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { getDataSource } from "./src/source/data.source";
import { Room } from "./src/app/entity/Room";
import { getTokenData } from "./src/utils/helpers.util";
import { Message } from "./src/app/entity/Message";
import { Friend } from "./src/app/entity/Friend";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
  },
});


app.use(cors());

io.on("connection", (socket: Socket) => {

  console.log("A user connected",socket.id);

  socket.on("CREATE_ROOM", async ({ roomName, participants, createdBy }) => {
    try {
    const headers = socket.handshake?.headers?.authorization?.split(' ')[1];
     const token = await getTokenData(headers || '');
      const connection = await getDataSource();
      const roomRepository = connection.getRepository(Room);
      const friendRepository = connection.getRepository(Friend);

      const friend=new Friend();
      friend.userId=token.id;
      friend.friendId=participants;
      const savedFriend = await friendRepository.save(friend);
      console.log("Friend created:", savedFriend);
      const room = new Room();
      room.name = roomName;
      room.participantId = participants; 
      room.createdBy = token.id;


      const savedRoom = await roomRepository.save(room);
      console.log("Room created:", savedRoom);

      socket.emit("ROOM_CREATED", savedRoom);
    } catch (err) {
      console.error("Error: Failed to create room", err);
      socket.emit("ERROR", "Failed to create room.");
    }
  });

  socket.on("JOIN_SINGLE_ROOM",({roomId})=>{
    try{
      socket.join(roomId)
      console.log(`Socket ${socket.id} joined room ${roomId}`)
      socket.emit("JOIN_ROOM_SUCCESS",{roomId})
    }
    catch(err){
      console.log("ERROR CREATING ROOM",err)
    }
  })



  socket.on("NEW_MESSAGE",async({roomId,message,senderId})=>{
    try{
      const connection=await getDataSource()
      const messageRepository=connection.getRepository(Message);


      const newMessage=new Message()
      newMessage.message=message;
      newMessage.roomId=roomId;
      newMessage.createdAt=new Date();
      newMessage.senderId=senderId;

      const savedMessage = await messageRepository.save(newMessage);

      console.log("MESSAGE SAVED",savedMessage)

       io.to(roomId).emit("RECEIVE_MESSAGES", {
        message: savedMessage,
      });
    }

    catch(err)
    {
      console.log("ERROR Saving Messages",err)
    }
  })
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
