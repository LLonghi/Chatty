import React, { useState, useEffect } from "react";
import "./App.css";
import { socket } from "./service/socket";

import fontAwesome from "./resources/fontawesome-free-5.14.0-web/css/all.css";
import ChatArea from "./components/chatArea/Index";
import Chatlist from "./components/chatlist/Index";
import Header from "./components/header/Index";
import User from "./components/user/Index";

function App() {
  const [chatData, setChatData] = useState({
    id: 0,
    name: "Group Chat",
  });

  const handleChatChange = (newChatData) => {
    socket.emit("ChangeChat", {
      old: chatData,
      new: newChatData,
    });
    setChatData(newChatData);
  };

  useEffect(() => {}, []);

  const handleScroll = (e) => {
    if (e && e.target.classList.contains("on-scrollbar") === false) {
      e.target.classList.add("on-scrollbar");
      setTimeout(() => {
        e.target.classList.remove("on-scrollbar");        
      }, 2500);
    }
  };
  
  window.addEventListener('scroll', handleScroll, true);

  return (
    <div className="App">
      <Header></Header>
      <Chatlist changeSelectedChat={handleChatChange}></Chatlist>
      <ChatArea chatInfo={chatData}></ChatArea>
      <User></User>
    </div>
  );
}

export default App;
