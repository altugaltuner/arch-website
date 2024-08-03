import React from 'react';
import "./DeleteConfirmationModal.scss";

function DeleteConfirmationModal({ showDeleteModal, onClose, onConfirm }) {
    if (!showDeleteModal) {
        return null;
    }

    return (
        <div className="delete-confirmation-modal">
            <div className="delete-confirmation-modal-content">
                <span
                    className="global-close-button"
                    onClick={onClose}
                >X </span>
                <h2 className='delete-confirmation-header'>Bu projeyi silmek istediğinize emin misiniz?</h2>
                <div className="delete-confirmation-modal-buttons">
                    <button className='confirm-button' onClick={onConfirm}>Onayla</button>
                    <button className='cancel-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
