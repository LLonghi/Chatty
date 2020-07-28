import React, { Component } from "react";
import "./Chat.css";

export default class Chat extends Component {
  render() {
    return (
      <div className="chat-area">
        <div className="chat-header"> this is the chat title </div>
        <div className="chat-messages">
          this is the messages area
          <i className="fas fa-user"></i>
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
