// src/components/EditFolderModal/EditFolderModal.jsx
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
        <div className="modal">
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>X</span>
                <h2>Klasörü Düzenle</h2>
                <input
                    type="text"
                    placeholder="Klasör Adı"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <div className="modal-buttons">
                    <button onClick={handleEdit}>Kaydet</button>
                    <button onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default EditFolderModal;
