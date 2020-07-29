import React, { Component } from "react";
import "./Message.css";

export default class Message extends React.Component {
  render() {
    if (this.props.showUser)
      return (
        <>
          <spam className="message-user">{this.props.user}</spam>
          <div className="message">{this.props.content}</div>
        </>
      );
    else
      return (
        <>
          <div className="message">{this.props.content}</div>
        </>
      );
  }
}
