import React from "react";
import ChatBox from "./ChatBox";
import SendMessage from "./SendMessage";

const Chat = () => {
    return (
        <div className="chat-main">
            <ChatBox />
            <SendMessage />
        </div>
    );
};
export default Chat;