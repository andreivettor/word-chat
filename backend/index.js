const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 8080;
const io = require("socket.io")(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? "https://word-chat-client.onrender.com"
        : "*",
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/", (req, res) => {
  res.send("Api Route");
});

io.on("connection", (socket) => {
  socket.broadcast.emit("chat", "user joined");
  socket.on("disconnect", function () {
    socket.broadcast.emit("chat", "user left");
  });
  socket.on("chat", (value, callback) => {
    console.log(value);
    socket.broadcast.emit("chat", value);
    callback({
      status: "ok",
    });
  });
});

server.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
