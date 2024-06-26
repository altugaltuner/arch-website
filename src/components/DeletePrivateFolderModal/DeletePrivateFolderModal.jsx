import React from 'react';
import './DeletePrivateFolderModal.scss';

function DeletePrivateFolderModal({ isOpen, onClose, onDelete }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="delete-folder-modal">
            <div className="delete-folder-modal-content">
                <span className="delete-folder-close-modal" onClick={onClose}>X</span>
                <h2 className='delete-folder-header'>Klasörü Sil</h2>
                <p className='delete-folder-p'>Bu kişisel klasörü silmek istediğinize emin misiniz?</p>
                <div className="delete-folder-modal-buttons">
                    <button className='delete-folder-delete-button' onClick={onDelete}>Sil</button>
                    <button className='delete-folder-cancel-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default DeletePrivateFolderModal;
