import React, { Component } from "react";
import "./ChatArea.css";

import Message from "../message/Index";

export default class ChatArea extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.messages = [
      {
        id: 0,
        content: "hello world!!!",
        user: "Leo",
        showUser: true,
        time: "12:40",
      },
      {
        id: 1,
        content: "Am i late to sau it?",
        user: "Leo",
        showUser: false,
        time: "12:41",
      },
      {
        id: 2,
        content: "say**",
        user: "Leo",
        showUser: false,
        time: "12:41",
        showTime: true,
      },
      {
        id: 3,
        content: "This is a message!",
        user: "Julia",
        showUser: true,
        time: "12:41",
        showTime: true,
      },
      {
        id: 4,
        content: "This is another message!",
        user: "Gustavo",
        showUser: true,
        time: "13:27",
        showTime: true,
      },
    ];
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  
  sayIt() {
    if (!this.state.value) return;

    var maxId = Math.max.apply(
        Math,
        this.messages.map((message) => message.id)
      ),
      date = new Date();

    this.messages.push({
      id: maxId + 1,
      content: this.state.value,
      user: "You",
      showUser: false,
      time: `${date.getHours()}:${date.getMinutes()}`,
      showTime: false,
      own: true,
    });

    this.setState(this.messages);
  }

  render() {
    return (
      <div className="chat-area">
        <div className="chat-header"> this is the chat title </div>

        <div className="chat-messages">
          {this.messages.map((item) => (
            <Message
              key={item.id}
              content={item.content}
              user={item.user}
              showUser={item.showUser}
              time={item.time}
              showTime={item.showTime}
              own={item.own}
            />
          ))}
        </div>

        <div className="chat-send-area" name="chat-send-area">
          <input
            type="text"
            className="chat-text-area"
            contentEditable={true}
            placeholder="Say something!"
            value={this.state.value}
            onChange={this.handleChange}
          />

          <button className="chat-send-button" onClick={() => this.sayIt()}>
            Send&nbsp;
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </div>
    );
  }
}
