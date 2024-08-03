import React, { useState } from 'react';
import './EditFolderModal.scss';

function EditFolderModal({ isOpen, onClose, onEdit, initialName }) {
    const [folderName, setFolderName] = useState(initialName);

    const handleEdit = () => {
        onEdit(folderName);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="edit-folder-modal">
            <div className="edit-folder-modal-content">
                <span className="global-close-button" onClick={onClose}>X</span>
                <h2 className='modal-header'>Klasörü Düzenle</h2>
                <input
                    className='edit-folder-input'
                    type="text"
                    placeholder="Klasör Adı"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <div className="edit-folder-modal-buttons">
                    <button className='edit-folder-save-button' onClick={handleEdit}>Kaydet</button>
                    <button className='edit-folder-cancel-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default EditFolderModal;
