import React, {Component} from 'react'
import './Chatlist.css';

import Chat from "../chat/Index";

export default class Chatlist extends Component {
    render() {
        return <div className="chatlist-area">
            <Chat title="This is a group chat" lastMessage="This is another message!"/>
            <Chat title="Julia" lastMessage="See ya tomorrow!"/>
            <Chat title="Gustavo" lastMessage="Lets play that new game xbox juste droped!"/>
            </div>;
      }
}