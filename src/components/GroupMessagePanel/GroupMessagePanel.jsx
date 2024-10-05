import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupMessagePanel.scss";
import { useAuth } from "../AuthProvider";
import GroupMembersModal from "../../pages/GroupsPage/GroupMembersModal";

const CACHE_DURATION = 15 * 60 * 1000;

function GroupMessagePanel({ selectedGroupId }) {
    const [groupName, setGroupName] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isUserInGroup, setIsUserInGroup] = useState(false);
    const { user } = useAuth();
    const [showMembersModal, setShowMembersModal] = useState(false);

    const userCompanyId = user?.company?.id;

    useEffect(() => {
        const fetchGroupDetails = async () => {

            const cachedGroup = localStorage.getItem(`group_${selectedGroupId}`);
            const cachedTimestamp = localStorage.getItem(`group_${selectedGroupId}_timestamp`);

            if (cachedGroup && cachedTimestamp) {
                const age = Date.now() - parseInt(cachedTimestamp, 10);
                if (age < CACHE_DURATION) {
                    const groupDetails = JSON.parse(cachedGroup);
                    setGroupName(groupDetails?.attributes?.groupName);
                    setMessages(groupDetails?.attributes?.chatMessages || []);
                    const isUserInGroup = groupDetails?.attributes.users_permissions_users?.data.some(u => u.id === user?.id);
                    setIsUserInGroup(isUserInGroup);
                    return;
                }
            }

            if (selectedGroupId) {
                try {
                    const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/groups/${selectedGroupId}?populate=users_permissions_users.role,company`);
                    const groupDetails = response.data.data;
                    if (!groupDetails) {
                        throw new Error("Group details not found");
                    }
                    const companyId = groupDetails?.attributes?.company?.data?.id;

                    if (companyId === userCompanyId) {
                        setGroupName(groupDetails?.attributes?.groupName);
                        setMessages(groupDetails?.attributes?.chatMessages || []);
                        const isUserInGroup = groupDetails?.attributes.users_permissions_users?.data.some(u => u.id === user?.id);
                        setIsUserInGroup(isUserInGroup);
                    }
                } catch (error) {
                }
            }
        };

        fetchGroupDetails();
    }, [selectedGroupId, user.id]);

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessage = {
                user: user.id,
                content: message,
                createdAt: new Date().toISOString(),
                groupId: selectedGroupId
            };
            socket.emit('message', newMessage);

            try {
                const response = await axios.put(`https://bold-animal-facf707bd9.strapiapp.com/api/groups/${selectedGroupId}`, {
                    data: {
                        chatMessages: [...messages, newMessage],
                    },
                });

                setMessages(response.data.data.attributes.chatMessages);
                setMessage("");
            } catch (error) {
            }
        }
    };

    return (
        <div className="message-panel-main">
            <div className="message-panel-head">
                <div className="message-panel-left-side">
                    <h2 className="message-panel-group-name">{groupName}</h2>
                </div>
                <div className="message-panel-right-side">
                    <button className="group-members-show" onClick={() => setShowMembersModal(true)}>Grup Üyeleri</button>
                    <GroupMembersModal
                        show={showMembersModal}
                        onClose={() => setShowMembersModal(false)}
                        groupId={selectedGroupId}
                    />
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
        </div>
    );
}

export default GroupMessagePanel;
