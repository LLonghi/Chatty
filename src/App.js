import React from "react";
import "./App.css";
import fontAwesome from "./resources/fontawesome-free-5.14.0-web/css/all.css";

import Chat from "./components/chat/Index";
import Chatlist from "./components/chatlist/Index";
import Header from "./components/header/Index";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Chatlist></Chatlist>
      <Chat></Chat>
    </div>
  );
}

export default App;
