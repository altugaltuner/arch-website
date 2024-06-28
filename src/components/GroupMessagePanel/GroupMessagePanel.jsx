import React, { useState } from "react";
import "./GroupMessagePanel.scss";

function GroupMessagePanel() {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        console.log("Message sent: ", message);
        setMessage("");
    };

    return (
        <div className="message-panel-main">
            <div className="message-panel-head">
                <div className="message-panel-left-side">
                    <img className="message-panel-group-img" src="" alt="group-pic" />
                    <h2 className="message-panel-group-name">Group Name</h2>
                </div>
                <div className="message-panel-right-side">
                    <img className="message-panel-search-logo" src="" alt="search-logo" />
                    <img src="" alt="media-logo" />
                </div>
            </div>
            <div className="message-panel-message-area">
                <p className="others-message-in-panel">Lorem ipsum</p>
                <p className="others-message-in-panel">dolor sit amet</p>
                <p className="others-message-in-panel">consectetur adipisicing</p>
                <p className="others-message-in-panel">Adipisci nihil itaque</p>
                <p className="my-message-in-panel">laboriosam, dolor</p>
                <p className="others-message-in-panel">eligendi unde eaque vel</p>
                <p className="my-message-in-panel">necessitatibus quo optio</p>
            </div>
            <div className="message-input-area">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button onClick={() => { console.log("Button clicked"); handleSendMessage(); }}>Send</button>

            </div>
        </div>
    );
};

export default GroupMessagePanel;
