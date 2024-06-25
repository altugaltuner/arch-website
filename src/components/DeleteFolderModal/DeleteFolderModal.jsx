import React from 'react';
import './DeleteFolderModal.scss';

function DeleteFolderModal({ isOpen, onClose, onDelete }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>X</span>
                <h2>Klasörü Sil</h2>
                <p>Bu klasörü silmek istediğinize emin misiniz?</p>
                <div className="modal-buttons">
                    <button onClick={onDelete}>Sil</button>
                    <button onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteFolderModal;
