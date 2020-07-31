// var msg = "Hello World";
// console.log(msg);
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = 5571;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("UserConnected", 'A user conected');
  
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });

  socket.on("SendMessage", (msg) => {
    console.log("message: " + msg);
    socket.broadcast.emit("MessageReceived", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
