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
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2 className='modal-header'>Çalışanları Çıkar</h2>
                <ul className='modal-ul'>
                    {employees.map((employee) => (
                        <li className='modal-li' key={employee.id}>
                            <label className='modal-label'>
                                <input
                                    className='modal-input'
                                    type="checkbox"
                                    checked={selectedUsers.includes(employee.id)}
                                    onChange={() => handleCheckboxChange(employee.id)}
                                />
                                {employee.username}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className='modal-backdrop-btn'>
                    <button onClick={handleConfirm}>Onayla</button>
                    <button onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default RemoveUserModal;
