import React, { Component } from "react";
import "./Message.css";

export default class Message extends React.Component {
  render() {
      return (
        <>
          <spam className={`${this.props.showUser?'message-user-show':''} ${this.props.own?'message-sent':''} message-user`}>{this.props.user.name}</spam>
          <div className={`${this.props.own?'message-sent':''} message`}>
            <spam className={`message-text`}>{this.props.content}</spam>
            <spam className={`${this.props.showTime?'message-time-show':''} message-time`}>{this.props.time}</spam>
          </div>
        </>
      );
  }
}
