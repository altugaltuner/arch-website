import React, { useState, useEffect } from "react";
import "./GroupMessagePanel.scss";

function GroupMessagePanel() {

    return (
        <div className="message-panel-main">
            <div className="message-panel-head">
                <div className="message-panel-left-side">
                    <img src="" alt="group-pic" />
                    <h2>Group Name</h2>
                </div>
                <div className="message-panel-right-side">
                    <img src="" alt="search-logo" />
                    <img src="" alt="media-logo" />
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

            </div>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci nihil itaque magnam laboriosam, dolor, perferendis veniam eligendi unde eaque vel necessitatibus quo optio commodi nobis sint totam, nisi atque ratione?</p>
        </div>
    );
};

export default GroupMessagePanel;
