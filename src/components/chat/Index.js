import React, { Component } from "react";
import "./Chat.css";

export default class Chat extends Component {
  render() {
    return (
      <div className="chat">
        <div className="chat-title">{this.props.title}</div>
        <div className="chat-last-message">{this.props.lastMessage}</div>
      </div>
    );
  }
}
