import React, { Component } from "react";
import "./ChatArea.css";
import { socket } from "../../service/socket";

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
        user: {
          name: "Leo",
          id: 0,
        },
        showUser: true,
        time: "12:40",
      },
      {
        id: 1,
        content: "Am i late to sau it?",
        user: {
          name: "Leo",
          id: 0,
        },
        showUser: false,
        time: "12:41",
      },
      {
        id: 2,
        content: "say**",
        user: {
          name: "Leo",
          id: 0,
        },
        showUser: false,
        time: "12:41",
        showTime: true,
      },
      {
        id: 3,
        content: "This is a message!",
        user: {
          name: "Julia",
          id: 1,
        },
        showUser: true,
        time: "12:41",
        showTime: true,
      },
      {
        id: 4,
        content: "This is another message!",
        user: {
          name: "Gustavo",
          id: 2,
        },
        showUser: true,
        time: "13:27",
        showTime: true,
      },
    ];

    this.addReceivedMessage = this.addReceivedMessage.bind(this);
  }

  componentDidMount() {
    socket.on("UserConnected", (response) => {
      console.log("Msg from server: " + response);
    });

    socket.on("MessageReceived", this.addReceivedMessage);
  }

  componentWillUnmount() {
    socket.off("get_data", this.getData);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  sayIt(message) {
    var maxId = Math.max.apply(
        Math,
        this.messages.map((message) => message.id)
      ),
      date = new Date(),
      lastMessageUserId = this.messages[this.messages.length - 1].user.id,
      owner = window.Chatty.user.id == message.user.id;

    this.messages.push({
      id: maxId + 1,
      content: message.text,
      user: message.user,
      showUser: owner
        ? false
        : lastMessageUserId == message.user.id
        ? false
        : true,
      time: `${date.getHours()}:${date.getMinutes()}`,
      showTime: true,
      own: owner,
    });

    this.setState(this.messages);
  }

  addReceivedMessage(data) {
    this.sayIt({
      text: data.message,
      user: data.user,
    });
  }

  sendMessage() {
    if (!this.state.value) return;

    this.sayIt({
      text: this.state.value,
      user: window.Chatty.user,
    });

    socket.emit("SendMessage", {
      user: window.Chatty.user,
      message: this.state.value,
    });

    this.state.value = "";
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

          <button
            className="chat-send-button"
            onClick={() => this.sendMessage()}
          >
            Send&nbsp;
            <i className="fas fa-paper-plane" />
          </button>
        </div>
      </div>
    );
  }
}
