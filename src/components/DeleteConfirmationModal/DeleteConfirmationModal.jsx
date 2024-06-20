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
                    className="delete-confirmation-close"
                    onClick={onClose}
                >X </span>
                <h2 className='delete-confirmation-header'>Bu projeyi silmek istediğinize emin misiniz?</h2>
                <div className="delete-confirmation-modal-buttons">
                    <button className='delete-confirmation-yes' onClick={onConfirm}>Onayla</button>
                    <button className='delete-confirmation-no' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
