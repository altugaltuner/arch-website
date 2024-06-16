import React from 'react';

function DeleteConfirmationModal({ showDeleteModal, onClose, onConfirm }) {
    if (!showDeleteModal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Are you sure you want to delete this project?</h2>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal;
