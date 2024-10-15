import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupMembersModal.scss";
const CACHE_DURATION = 15 * 60 * 1000;

const GroupMembersModal = ({ show, onClose, groupId }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (show && groupId) {
            const fetchMembers = async () => {
                const cachedMembers = localStorage.getItem(`group_${groupId}_members`);
                const cachedTimestamp = localStorage.getItem(`group_${groupId}_members_timestamp`);
                if (cachedMembers && cachedTimestamp) {
                    const age = Date.now() - parseInt(cachedTimestamp, 10);
                    if (age < CACHE_DURATION) {
                        setMembers(JSON.parse(cachedMembers));
                        return;
                    }
                }
                try {
                    const response = await axios.get(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/groups/${groupId}?populate[users_permissions_users][populate]=access`);
                    setMembers(response.data.data.attributes.users_permissions_users.data);
                    localStorage.setItem(`group_${groupId}_members`, JSON.stringify(response.data.data.attributes.users_permissions_users.data));
                    localStorage.setItem(`group_${groupId}_members_timestamp`, Date.now().toString());
                } catch (error) {
                }
            };

            fetchMembers();
        }
    }, [show, groupId]);

    if (!show) return null;

    return (
        <div className="group-members-modal">
            <div className="group-members-modal-content">
                <button className="group-members-close-button" onClick={onClose}>X</button>
                <h2 className="group-members-header">Grup Üyeleri</h2>
                <ul className="members-ul">
                    {members.map(member => (
                        <li className="members-li" key={member.id}>
                            <p className="members-li-p">{member.attributes.username} - {member.attributes.access.data.attributes.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default GroupMembersModal;
