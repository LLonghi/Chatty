// var msg = "Hello World";
// console.log(msg);
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var port = 5571;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

var users = [
  {
    id: 1,
    name: "Leo",
  },
  {
    id: 2,
    name: "Julia",
  },
  {
    id: 3,
    name: "Gustavo",
  },
];

var chatList = [
  {
    id: 0,
    name: "Group Chat",
  },
  {
    id: 1,
    name: "Julia",
  },
  {
    id: 2,
    name: "Gustavo",
  },
];

var messages = [
  {
    id: 0,
    userId: 1,
    chatId: 0,
    text: "Hello World!!!",
  },
  {
    id: 1,
    userId: 1,
    chatId: 0,
    text: "Am i late to sau it?",
  },
  {
    id: 2,
    userId: 1,
    chatId: 0,
    text: "Say***",
  },
  {
    id: 3,
    userId: 2,
    chatId: 0,
    text: "Hey Leo!",
  },
  {
    id: 4,
    userId: 3,
    chatId: 0,
    text: "Whats up Bro?",
  },
  {
    id: 5,
    userId: 2,
    chatId: 1,
    text: "See ya tomorrow!",
  },
  {
    id: 6,
    userId: 3,
    chatId: 2,
    text: "Lets play that new game xbox just droped!",
  },
];

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.join(chatList[0].id);

  socket.broadcast.emit("UserConnected", "A user conected");

  var user = {
    id: users.length + 1,
    socketId: socket.id,
    name: `User`,
  };

  users.push(user);

  socket.broadcast.emit(
    "NewChatEvent",
    `${user.name}[${user.id}] just Connected!`
  );
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

    socket.broadcast.emit(
      "NewChatEvent",
      `${oldName}[${user.id}] changed his name to ${user.name}`
    );
  });

  socket.on("SendMessage", (data) => {
    var id = messages.length + 1;

    messages.push({
      id: id,
      userId: data.user.id,
      chatId: data.chatId,
      text: data.text,
    });

    socket.to(data.chatId).broadcast.emit("MessageReceived", {
      id: id,
      user: data.user,
      chatId: data.chatId,
      text: data.text,
    });
  });

  socket.on("GetChatMessages", (chatId) => {
    socket.emit("ChatMessages", {
      id: chatId,
      messages: messages
        .filter((message) => message.chatId === chatId)
        .map(
          (message) =>
            new Object({
              id: message.id,
              user: users.find((user) => user.id === message.userId),
              text: message.text,
            })
        ),
    });
  });

  socket.on("ChangeChat", (chat) => {
    socket.leave(chat.old.id);
    socket.join(chat.new.id);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
