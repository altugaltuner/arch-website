import React, { useState } from 'react';
import './DeleteFolderModal.scss';

function DeleteFolderModal({ isOpen, onClose, onDelete }) {

    const handleDelete = () => {
        onClose();
        onDelete();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="delete-folder-modal">
            <div className="delete-folder-modal-content">
                <span className="global-close-button" onClick={onClose}>X</span>
                <h2 className='modal-header'>Klasörü Silmek İstediğinize Emin Misiniz ?</h2>
                <div className="delete-folder-modal-buttons">
                    <button className='delete-folder-save-button' onClick={handleDelete}>Kaydet</button>
                    <button className='delete-folder-cancel-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteFolderModal;
