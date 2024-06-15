import React from 'react';
import "./TeamModal.scss";

function TeamModal({ show, onClose, teamName, handleInputChange, handleSubmit }) {
    if (!show) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className='modal-content-header'>Yeni Takım Oluştur</h2>
                <input
                    type="text"
                    name="teamName"
                    placeholder="Takım Adı"
                    value={teamName}
                    onChange={handleInputChange}
                />
                <div className='btn-div-for-modal'>
                    <button onClick={handleSubmit}>Oluştur</button>
                    <button onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default TeamModal;
