import React, { useState } from 'react';
import './EditGroupModal.scss';

function EditGroupModal({ showEditModal, setShowEditModal, handleEditGroup }) {
    const [groupName, setGroupName] = useState('');

    const handleInputChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleConfirm = () => {
        handleEditGroup(groupName);
    };

    if (!showEditModal) {
        return null;
    }

    return (
        <div className="group-edit-modal">
            <div className="group-edit-modal-content">
                <span className="close-edit-modal" onClick={() => setShowEditModal(false)}>X</span>
                <h2 className='group-edit-modal-header'>Grubu Düzenle</h2>
                <div className="group-edit-modal-inputs">
                    <label htmlFor="group-name">Grup Adı</label>
                    <input
                        type="text"
                        id="group-name"
                        name="group-name"
                        placeholder="Grup Adı"
                        value={groupName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="group-edit-modal-buttons">
                    <button className='modal-button-confirm' onClick={handleConfirm}>Onayla</button>
                    <button className='modal-button-cancel' onClick={() => setShowEditModal(false)}>İptal Et</button>
                </div>
            </div>
        </div>
    );
}

export default EditGroupModal;
