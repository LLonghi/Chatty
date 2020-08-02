import React, { useState, useEffect } from "react";
import "./App.css";
import { socket } from "./service/socket";

import fontAwesome from "./resources/fontawesome-free-5.14.0-web/css/all.css";
import ChatArea from "./components/chatArea/Index";
import Chatlist from "./components/chatlist/Index";
import Header from "./components/header/Index";
import User from "./components/user/Index";

function App() {
  useEffect(() => {
    socket.on("FromAPI", (data) => {
      setResponse(data);
      console.log(data);
    });
  }, []);

  const [data, setResponse] = useState("");

  const [chatData, setChatData] = useState({
    id: 0,
    name: "Nome do Chat",
  });


  return (
    <div className="App">
      <Header></Header>
      <Chatlist changeSelectedChat={setChatData}></Chatlist>
      <ChatArea chatInfo={chatData}></ChatArea>
      <User></User>
    </div>
  );
}

export default App;
