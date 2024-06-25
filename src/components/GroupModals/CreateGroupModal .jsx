import React from 'react';
import './CreateGroupModal.scss';

const CreateGroupModal = ({ showModal, setShowModal, newGroup, handleInputChange, handleSubmit }) => {
    if (!showModal) return null;

    return (
        <div className="create-group-modal">
            <div className="create-group-modal-content">
                <span className="create-group-close-group-modal" onClick={() => setShowModal(false)}>X</span>
                <h2 className='create-group-modal-header'>Yeni Grup Oluştur</h2>
                <input
                    className='create-group-modal-name-input'
                    type="text"
                    name="groupName"
                    placeholder="Grup Adı"
                    value={newGroup.groupName}
                    onChange={handleInputChange}
                />
                <div className='create-group-button-div-group'>
                    <button className='create-group-modal-div-create-btn' onClick={handleSubmit}>Oluştur</button>
                    <button className='create-group-modal-div-cancel-btn' onClick={() => setShowModal(false)}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;
