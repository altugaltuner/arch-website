import React, { useEffect, useState } from "react";
import axios from "axios";
import io from 'socket.io-client';
import "./GroupMessagePanel.scss";
import { useAuth } from "../AuthProvider";
import GroupMembersModal from "../../pages/GroupsPage/GroupMembersModal"; // Yeni modalı import ettik

const socket = io('http://localhost:1337'); // Strapi server'ınızın URL'sini kullanın

function GroupMessagePanel({ selectedGroupId }) {
    const [groupName, setGroupName] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isUserInGroup, setIsUserInGroup] = useState(false);
    const { user } = useAuth();
    const [showMembersModal, setShowMembersModal] = useState(false); // Modal state

    useEffect(() => {
        console.log(user);
    }, [user]);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            if (selectedGroupId) {
                try {
                    const response = await axios.get(`http://localhost:1337/api/groups/${selectedGroupId}?populate=users_permissions_users.role`);
                    const groupDetails = response.data.data;
                    setGroupName(groupDetails.attributes.groupName);
                    setMessages(groupDetails.attributes.chatMessages || []);
                    const isUserInGroup = groupDetails.attributes.users_permissions_users.data.some(u => u.id === user.id);
                    setIsUserInGroup(isUserInGroup);
                } catch (error) {
                    console.error("Error fetching group details:", error);
                }
            }
        };

        fetchGroupDetails();
    }, [selectedGroupId, user.id]);

    useEffect(() => {
        socket.on('message', (msg) => {
            console.log('Message received from server:', msg);
            if (msg.groupId === selectedGroupId) {
                setMessages((prevMessages) => [...prevMessages, msg]);
            }
        });

        return () => {
            socket.off('message');
        };
    }, [selectedGroupId]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                user: user.id,
                content: message,
                createdAt: new Date().toISOString(),
                groupId: selectedGroupId
            };

            console.log('Sending message:', newMessage);
            socket.emit('message', newMessage);

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
            {isUserInGroup && (
                <>
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
                </>
            )}
            <GroupMembersModal
                show={showMembersModal}
                onClose={() => setShowMembersModal(false)}
                groupId={selectedGroupId}
            /> {/* Modal bileşeni */}
        </div>
    );
}

export default GroupMessagePanel;
