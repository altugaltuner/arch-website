import React from 'react';
import "../GroupModals/DeleteGroupModal.scss"

const DeleteGroupModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteGroup }) => {
    if (!showDeleteModal) return null;

    return (
        <div className="delete-group-modal">
            <div className="delete-group-modal-content">
                <span className="delete-group-close" onClick={() => setShowDeleteModal(false)}>X</span>
                <h2>Grubu Sil</h2>
                <p>Grubu gerçekten silmek istiyor musunuz?</p>
                <button onClick={handleDeleteGroup}>Evet</button>
                <button onClick={() => setShowDeleteModal(false)}>Hayır</button>
            </div>
        </div>
    );
};

export default DeleteGroupModal;
