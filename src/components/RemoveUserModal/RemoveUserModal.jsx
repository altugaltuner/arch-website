import React, { useState } from 'react';
import "./RemoveUserModal.scss";

const RemoveUserModal = ({ show, onClose, employees, handleRemoveUsers }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelected) =>
            prevSelected.includes(userId)
                ? prevSelected.filter((id) => id !== userId)
                : [...prevSelected, userId]
        );
    };

    const handleConfirm = () => {
        handleRemoveUsers(selectedUsers);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="remove-user-modal">
            <div className="remove-user-modal-content">
                <h2 className='remove-user-modal-header'>Çalışanları Çıkar</h2>
                <ul className='remove-user-modal-ul'>
                    {employees.map((employee) => (
                        <li className='remove-user-modal-li' key={employee.id}>
                            <label className='remove-user-modal-label'>
                                <input
                                    className='remove-user-modal-input'
                                    type="checkbox"
                                    checked={selectedUsers.includes(employee.id)}
                                    onChange={() => handleCheckboxChange(employee.id)}
                                />
                                {employee.username}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className='remove-user-modal-backdrop-btn'>
                    <button className='remove-user-submit-button' onClick={handleConfirm}>Onayla</button>
                    <button className='remove-user-cancel-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default RemoveUserModal;
