// src/components/AddFolderModal/AddFolderModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AddFolderModal.scss';

function AddFolderModal({ isOpen, onClose, onFolderCreated, userId }) {
    const [folderName, setFolderName] = useState('');

    const handleSubmit = async () => {
        console.log('Starting folder creation process...');
        console.log('Folder Name:', folderName);
        console.log('User ID:', userId);

        try {
            const response = await axios.post('http://localhost:1337/api/personal-folders', {
                data: {
                    folderName,
                    users_permissions_user: userId // Ensure the user association
                }
            });
            console.log('Folder creation response:', response.data);
            onFolderCreated(response.data.data);
            onClose();
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>X</span>
                <h2 className='modal-header'>Yeni Klasör Oluştur</h2>
                <input
                    className='modal-input'
                    type="text"
                    placeholder="Klasör Adı"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <div className="modal-buttons">
                    <button className='modal-button-create' onClick={handleSubmit}>Oluştur</button>
                    <button className='modal-button-cancel' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default AddFolderModal;
