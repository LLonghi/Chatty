import React, { Component } from "react";
import "./User.css";
import { socket } from "../../service/socket";

export default class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 0,
        name: "UserName",
      },
    };
  }

  componentDidMount() {
    socket.on("Connected", (data) => {
      window.Chatty = {
        user: data,
      };

      this.setState({
        user: data,
      });
    });
  }

  changeName() {
    var name = prompt("Please enter your new name");
    if (name) {
      socket.emit("ChangeUserName", {
        id: window.Chatty.user.id,
        name: name,
      });
      this.state.user.name = name;
      this.setState(this.state.user);
    }
  }

  render() {
    return (
      <div className="user-area">
        <div className="user-picture"></div>
        <div className="user-info">
          <div className="user-name">
            {this.state.user.name}{" "}
            <button className="user-edit" onClick={() => this.changeName()}>
              <i className="fas fa-pen" />
            </button>
          </div>
          <div className="user-id">#{this.state.user.id}</div>
        </div>
      </div>
    );
  }
}
