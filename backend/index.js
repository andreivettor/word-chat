const express = require("express");
const app = express();
const server = require("https").createServer(app);
const port = process.env.PORT || 8080;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/", (req, res) => {
  res.send("Api Route");
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", function () {
    console.log("user disconnected");
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
