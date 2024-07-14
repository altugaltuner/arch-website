import React from "react";
import "./DeleteMessageModal.scss";

function DeleteMessageModal({ show, onClose, onDelete }) {
    if (!show) {
        return null;
    }

    return (
        <div className="delete-message-modal">
            <div className="modal-content">
                <h2>Silmek istediğinize emin misiniz?</h2>
                <button className="confirm-button" onClick={onDelete}>Sil</button>
                <button className="cancel-button" onClick={onClose}>İptal</button>
            </div>
        </div>
    );
}

export default DeleteMessageModal;
