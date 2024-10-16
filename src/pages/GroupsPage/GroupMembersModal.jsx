import React, { useEffect, useState } from "react";
import axios from "axios";
import "./GroupMembersModal.scss";

const GroupMembersModal = ({ show, onClose, groupId }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        if (show && groupId) {
            const fetchMembers = async () => {
                try {
                    const response = await axios.get(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/groups/${groupId}?populate[users_permissions_users][populate]=access`);
                    setMembers(response.data.data.attributes.users_permissions_users.data);
                } catch (error) { }
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
