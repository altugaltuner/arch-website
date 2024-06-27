import React from 'react';
import "./NewProfessionModal.scss";

function NewProfessionModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="new-profession-modal-overlay">
            <div className="new-profession-modal-main">
                <button className="modal-close-button" onClick={onClose}>X</button>
                <h2 className='new-pro-header'>Yeni Meslek Ekle</h2>
                <input className='new-pro-input' type="text " placeholder="meslek adı" />
                <div className='new-pro-button-div'>
                    <button className='new-pro-button'>Ekle</button>
                    <button className='new-pro-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default NewProfessionModal;