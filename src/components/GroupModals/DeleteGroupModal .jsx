import React from 'react';

const DeleteGroupModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteGroup }) => {
    if (!showDeleteModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setShowDeleteModal(false)}>X</span>
                <h2>Grubu Sil</h2>
                <p>Grubu gerçekten silmek istiyor musunuz?</p>
                <button onClick={handleDeleteGroup}>Evet</button>
                <button onClick={() => setShowDeleteModal(false)}>Hayır</button>
            </div>
        </div>
    );
};

export default DeleteGroupModal;
