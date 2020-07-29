import React, { Component } from "react";
import "./ChatArea.css";

import Message from "../message/Index";

export default class ChatArea extends Component {
  render() {
    return (
      <div className="chat-area">
        <div className="chat-header"> this is the chat title </div>
        
        <div className="chat-messages">
          <Message content="hello world!!!" user="Leo" showUser={true}/>
          <Message content="Am i late to sau it?" user="Leo" />
          <Message content="say**" user="Leo" />
          <Message content="This is a message!" user="Julia" showUser={true}/>
          <Message content="This is another message!" user="Gustavo" showUser={true}/>
        </div>

        <div className="chat-send-area">
          <div
            className="chat-text-area"
            contentEditable
            placeholder="Say something!"
          ></div>

          <div className="chat-send-button">
            Send&nbsp;
            <i className="fas fa-paper-plane" />
          </div>
        </div>
      </div>
    );
  }
}
