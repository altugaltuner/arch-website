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
                <span className="group-edit-modal-span" onClick={() => setShowEditModal(false)}>X</span>
                <h2 className='group-edit-modal-header'>Grubu Düzenle</h2>
                <div className="group-edit-modal-inputs">
                    <label className='group-edit-label' htmlFor="group-name">Grup Adı</label>
                    <input
                        type="text"
                        className='group-edit-input'
                        id="group-name"
                        name="group-name"
                        placeholder="Grup Adı"
                        value={groupName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="group-edit-modal-buttons">
                    <button className='group-edit-modal-button-confirm' onClick={handleConfirm}>Onayla</button>
                    <button className='group-edit-modal-button-cancel' onClick={() => setShowEditModal(false)}>İptal Et</button>
                </div>
            </div>
        </div>
    );
}

export default EditGroupModal;
