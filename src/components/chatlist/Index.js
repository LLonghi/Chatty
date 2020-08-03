import React, { Component } from "react";
import "./Chatlist.css";

import Chat from "../chat/Index";

export default class Chatlist extends Component {
  constructor(props) {
    super(props);

    this.chatList = [
      {
        id: 0,
        description: "Group Chat",
        type: "group",
        lastMessage: {
          user: {
            id: 1,
            name: "Gustavo",
          },
          text: "this is the last message",
        },
      },
      {
        id: 1,
        description: "Julia",
        type: "private",
        lastMessage: {
          user: {
            id: 1,
            name: "Julia",
          },
          text: "See ya tomorrow!",
        },
      },
      {
        id: 2,
        description: "Gustavo",
        type: "private",
        lastMessage: {
          user: {
            id: 2,
            name: "Gustavo",
          },
          text: "Lets play that new game xbox just droped!",
        },
      },
    ];
  }

  render() {
    return (
      <div className="chatlist-area">
        {this.chatList.map((item) => (
          <Chat
            key={item.id}
            chatData={item}
            changeSelectedChat={this.props.changeSelectedChat}
          />
        ))}
      </div>
    );
  }
}
