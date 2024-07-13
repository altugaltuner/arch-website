import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupMessagePanel.scss";
import { useAuth } from "../AuthProvider";
import GroupMembersModal from "../../pages/GroupsPage/GroupMembersModal"; // Yeni modalı import ettik

function GroupMessagePanel({ selectedGroupId }) {
    const [groupName, setGroupName] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { user } = useAuth();
    const [showMembersModal, setShowMembersModal] = useState(false); // Modal state

    useEffect(() => {
        console.log(user);
    }, [user]);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            if (selectedGroupId) {
                try {
                    const response = await axios.get(`http://localhost:1337/api/groups/${selectedGroupId}?populate=*`);
                    const groupDetails = response.data.data;
                    setGroupName(groupDetails.attributes.groupName);
                    setMessages(groupDetails.attributes.chatMessages || []);
                } catch (error) {
                    console.error("Error fetching group details:", error);
                }
            }
        };

        fetchGroupDetails();
    }, [selectedGroupId]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                user: user.id,
                content: message,
                createdAt: new Date().toISOString(),
            };

            try {
                const response = await axios.put(`http://localhost:1337/api/groups/${selectedGroupId}`, {
                    data: {
                        chatMessages: [...messages, newMessage],
                    },
                });

                setMessages(response.data.data.attributes.chatMessages);
                setMessage("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    return (
        <div className="message-panel-main">
            <div className="message-panel-head">
                <div className="message-panel-left-side">
                    <img className="message-panel-group-img" src="" alt="group-pic" />
                    <h2 className="message-panel-group-name">{groupName}</h2>
                </div>
                <div className="message-panel-right-side">
                    <button className="group-members-show" onClick={() => setShowMembersModal(true)}>Grup Üyeleri</button> {/* Modal açma butonu */}
                </div>
            </div>
            <div className="message-panel-message-area">
                {messages.map((msg, index) => (
                    <p
                        key={index}
                        className={
                            msg.user === user.id
                                ? "my-message-in-panel"
                                : "others-message-in-panel"
                        }
                    >
                        {msg.user === user.id ? "" : "Other: "}
                        {msg.content}
                    </p>
                ))}
            </div>
            <div className="message-input-area">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message"
                />
                <button className="message-send-chat" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
            <GroupMembersModal
                show={showMembersModal}
                onClose={() => setShowMembersModal(false)}
                groupId={selectedGroupId}
            /> {/* Modal bileşeni */}
        </div>
    );
}

export default GroupMessagePanel;
