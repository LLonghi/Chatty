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
      // {
      //   id: 0,
      //   content: "hello world!!!",
      //   user: {
      //     name: "Leo",
      //     id: 0,
      //   },
      //   showUser: true,
      //   showTime: true,
      //   time: "12:40",
      // }
    ];

    this.addReceivedMessage = this.addReceivedMessage.bind(this);
    this.userChangedName = this.userChangedName.bind(this);
  }

  componentDidMount() {
    socket.on("UserConnected", (response) => {
      console.log("Msg from server: " + response);
    });

    socket.on("MessageReceived", this.addReceivedMessage);

    socket.on("UserChangedName", this.userChangedName);

    socket.emit("GetChatMessages", this.props.chatInfo.id);
    socket.on("ChatMessages", (chatData) => {
      if (chatData.id === this.props.chatInfo.id) {
        this.messages = [];
        chatData.messages.forEach((message) => this.sayIt(message));
      }
    });

    socket.on("NewChatEvent", (event) => {
      this.sayIt({
        text: event,
        user: {
          id: -1,
          name: "server",
        },
        serverMessage: true,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.chatInfo.id !== prevProps.chatInfo.id) {
      socket.emit("GetChatMessages", this.props.chatInfo.id);
    }
  }

  componentWillUnmount() {
    socket.off("get_data", this.getData);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  userChangedName(user) {
    var userMessages = this.messages.filter(
      (message) => message.user.id === user.id
    );

    console.log(`[${user.oldName}] changed his/her name to [${user.name}]`);

    userMessages.forEach((message) => {
      message.user.name = user.name;
    });

    this.setState(this.messages);
  }

  changeUserName() {
    var name = prompt("Please enter your new name");
    if (name)
      socket.emit("ChangeUserName", {
        id: window.Chatty.user.id,
        name: name,
      });
  }

  sayIt(message) {
    var anyMessages = this.messages.length > 0,
      maxId = anyMessages
        ? Math.max.apply(
            Math,
            this.messages.map((message) => message.id)
          )
        : 0,
      date = new Date(),
      lastMessageUserId = anyMessages
        ? this.messages[this.messages.length - 1].user.id
        : -1,
      owner = window.Chatty.user.id === message.user.id;

    this.messages.push({
      id: maxId + 1,
      content: message.text,
      user: message.user,
      serverMessage: message.serverMessage,
      showUser: owner
        ? false
        : lastMessageUserId === message.user.id
        ? false
        : true,
      time: `${date.getHours()}:${"0".repeat(
        2 - date.getMinutes().toString().length
      )}${date.getMinutes()}`,
      showTime: true,
      own: owner,
    });

    this.setState(this.messages);
  }

  addReceivedMessage(data) {
    this.sayIt({
      user: data.user,
      text: data.message,
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
      chatId: this.props.chatInfo.id,
    });

    this.state.value = "";
  }

  render() {
    return (
      <div className="chat-area">
        <div className="chat-header">{this.props.chatInfo.name}</div>

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
              serverMessage={item.serverMessage}
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
