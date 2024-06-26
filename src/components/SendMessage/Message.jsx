import React from "react";
import { useAuth } from "../AuthProvider";
const Message = ({ message }) => {
    const { currentUser } = useAuth();
    return (
        <div>
            <div
                className={`chat ${message.attributes.User === currentUser.displayName
                    ? "chat-start"
                    : "chat-end"
                    }`}
            >
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="User Avatar" src={message.attributes.Photo} />
                    </div>
                </div>
                <div className="chat-header">{message.attributes.User}</div>
                <div className="chat-bubble">{message.attributes.message}</div>
            </div>
        </div>
    );
};
export default Message;