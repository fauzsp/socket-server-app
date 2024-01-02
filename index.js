const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // origin: "https://fauzsp.github.io/socket-client-app/",
        origin: "http://localhost:3006",
        methods: ["GET, POST"],
    }
});

io.on("connection", (socket) => {
    console.log(socket.id, 'checking user id');
    socket.on("join_room", (data) => {
        socket.join(data);
    })

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
        console.log(data, '==========> message passed from server')
    })
    socket.on("send_room_message", (data) => {
        socket.to(data.room).emit("receive_room_message", data);
      });
})
const port = 3001;
server.listen(port, () => {
    console.log("server is running ", port) 
})