import React, { useState, useEffect } from 'react';
import './AddUserModal.scss';

function AddUserModal({ show, onClose, users, handleAddUsers }) {
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        if (!show) {
            setSelectedUsers([]);
        }
    }, [show]);

    if (!show) {
        return null;
    }

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const handleSubmit = () => {
        handleAddUsers(selectedUsers);
    };

    return (
        <div className="adduser-modal">
            <div className="adduser-modal-content">
                <span className="adduser-modal-close" onClick={onClose}>&times;</span>
                <h2 className='adduser-modal-content-header'>Çalışan Ekle</h2>
                <ul className='adduser-modal-ul'>
                    {users.map((user) => (
                        <li className='adduser-modal-li' key={user.id}>
                            <label className='adduser-modal-label'>
                                <input
                                    className='adduser-modal-input'
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleCheckboxChange(user.id)}
                                />
                                {user.username}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="adduser-btn-div-for-modal">
                    <button className='adduser-btn-div-for-modal-submit' onClick={handleSubmit}>Onayla</button>
                    <button className='adduser-btn-div-for-modal-cancel' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default AddUserModal;
