import React, { Component } from "react";
import "./Chat.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.changeSelectedChat = this.changeSelectedChat.bind(this);
  }

  changeSelectedChat() {
    this.props.changeSelectedChat({
      id: 0,
      name: this.props.title
    });
  }

  render() {
    return (
      <div className="chat" onClick={this.changeSelectedChat}>
        <div className="chat-title">{this.props.title}</div>
        <div className="chat-last-message">{this.props.lastMessage.text}</div>
      </div>
    );
  }
}
