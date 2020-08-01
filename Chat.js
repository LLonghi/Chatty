// var msg = "Hello World";
// console.log(msg);
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = 5571;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

var users = [];
var maxId = 3;

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.broadcast.emit("UserConnected", "A user conected");

  var user = {
    id: maxId,
    name: `User #${maxId}`,
  };

  maxId++;

  users.push(user);

  socket.emit("Connected", user);

  socket.on("ChangeUserName", (user) => {
    var userData = users.find((rec) => rec.id === user.id),
      oldName = userData.name;

    userData.name = user.name;

    socket.broadcast.emit("UserChangedName", {
      id: user.id,
      name: user.name,
      oldName: oldName,
    });
  });

  socket.on("SendMessage", (data) => {
    console.log("message: " + data.message);

    socket.broadcast.emit("MessageReceived", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
