import React from 'react';
import "../GroupModals/DeleteGroupModal.scss"

const DeleteGroupModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteGroup }) => {
    if (!showDeleteModal) return null;

    return (
        <div className="delete-group-modal">
            <div className="delete-group-modal-content">
                <span className="delete-group-close" onClick={() => setShowDeleteModal(false)}>X</span>
                <h2 className="delete-group-header">Grubu Sil</h2>
                <p className="delete-group-p">Grubu gerçekten silmek istiyor musunuz?</p>
                <div className='delete-group-buttons-div'>
                    <button className="delete-group-btn-yes" onClick={handleDeleteGroup}>Evet</button>
                    <button className="delete-group-btn-no" onClick={() => setShowDeleteModal(false)}>Hayır</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteGroupModal;
