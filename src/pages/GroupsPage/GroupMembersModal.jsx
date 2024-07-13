import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupMembersModal.scss";

const GroupMembersModal = ({ show, onClose, groupId }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (show && groupId) {
            const fetchMembers = async () => {
                try {
                    const response = await axios.get(`http://localhost:1337/api/groups/${groupId}?populate[users_permissions_users][populate]=access`);
                    setMembers(response.data.data.attributes.users_permissions_users.data);
                } catch (error) {
                    console.error("Error fetching group members:", error);
                }
            };

            fetchMembers();
        }
    }, [show, groupId]);

    if (!show) return null;

    return (
        <div className="group-members-modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>Kapat</button>
                <h2>Grup Üyeleri</h2>
                <ul>
                    {members.map(member => (
                        <li key={member.id}>
                            {console.log(member)}
                            {member.attributes.username} - {member.attributes.access.data.attributes.role}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupMembersModal;
