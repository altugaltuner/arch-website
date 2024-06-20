import React from 'react';
import './CreateGroupModal.scss';

const CreateGroupModal = ({ showModal, setShowModal, newGroup, handleInputChange, handleSubmit }) => {
    if (!showModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-group-modal" onClick={() => setShowModal(false)}>X</span>
                <h2 className='modal-group-header'>Yeni Grup Oluştur</h2>
                <input
                    className='modal-group-name-input'
                    type="text"
                    name="groupName"
                    placeholder="Grup Adı"
                    value={newGroup.groupName}
                    onChange={handleInputChange}
                />
                <div className='button-div-group'>
                    <button className='modal-div-create-btn' onClick={handleSubmit}>Oluştur</button>
                    <button className='modal-div-cancel-btn' onClick={() => setShowModal(false)}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;
