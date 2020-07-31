import React, { useState, useEffect } from "react";
import "./App.css"; 
import {socket} from "./service/socket";

import fontAwesome from "./resources/fontawesome-free-5.14.0-web/css/all.css";
import ChatArea from "./components/chatArea/Index";
import Chatlist from "./components/chatlist/Index";
import Header from "./components/header/Index";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse(data);
      console.log(data);
    });
    socket.on("Connected", data => {
     window.Chatty ={
      user:data
     };
    });
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <Chatlist></Chatlist>
      <ChatArea></ChatArea>
    </div>
  );
}

export default App;
