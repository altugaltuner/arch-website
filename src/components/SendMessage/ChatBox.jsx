import Message from "./Message";
import { React, useState, useRef, useEffect } from "react";
const ChatBox = () => {
    const messagesEndRef = useRef();
    const [messages, setMessages] = useState([]);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behaviour: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("https://wonderful-pleasure-64045d06ec.strapiapp.com/api/chat-room-messages", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((res) => setMessages(res.data));
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="pb-44 pt-20 container">
            {messages.map((message, id) => (
                <Message key={id} message={message} />
            ))}
            <div ref={messagesEndRef}></div>
        </div>
    );
};
export default ChatBox;