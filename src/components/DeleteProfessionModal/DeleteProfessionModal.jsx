import React from 'react';
import './DeleteProfessionModal.scss';

function DeleteModal({ isOpen, onClose, onDelete }) {
    if (!isOpen) return null;

    return (
        <div className="delete-pro-modal-main">
            <div className="delete-pro-modal">
                <span className="global-close-button" onClick={onClose}>X</span>
                <h2 className='delete-pro-modal-p'>Silmek istiyor musunuz?</h2>
                <div className='delete-pro-div'>
                    <button className='delete-pro-modal-yes' onClick={onDelete}>Evet</button>
                    <button className='delete-pro-modal-no' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;
