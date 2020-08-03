import React, { Component } from "react";
import "./Chat.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.changeSelectedChat = this.changeSelectedChat.bind(this);
  }

  changeSelectedChat() {
    this.props.changeSelectedChat({
      id: this.props.chatData.id,
      name: this.props.chatData.description
    });
  }

  render() {
    return (
      <div className="chat" onClick={this.changeSelectedChat}>
        <div className="chat-title">{this.props.chatData.description}</div>
        <div className="chat-last-message">{this.props.chatData.lastMessage.text}</div>
      </div>
    );
  }
}
