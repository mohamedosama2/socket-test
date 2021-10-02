const express = require("express"),
  cors = require("cors"),
  socketio = require("socket.io"),
  { createServer } = require("http"),
  router = require("./routers/router");

const app = express(),
  server = createServer(app),
  PORT = process.env.PORT || 8000,
  io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(router);

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => console.log("user discoonected"));
});
server.listen(PORT, () => console.log(`server is running in port ${PORT}`));
