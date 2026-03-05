import React from 'react';
import './DeleteProfessionModal.scss';

function DeleteModal({ isOpen, onClose, onDelete }) {
    if (!isOpen) return null;

    return (
        <div className="delete-pro-modal-main">
            <div className="delete-pro-modal">
                <button className="global-close-button" onClick={onClose}>X</button>
                <h2 className='modal-header'>Silmek istiyor musunuz?</h2>
                <div className='delete-pro-div'>
                    <button className='confirm-button' onClick={onDelete}>Evet</button>
                    <button className='cancel-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
