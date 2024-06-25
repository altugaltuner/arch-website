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
        <div className="addfolder-modal">
            <div className="addfolder-modal-content">
                <span className="addfolder-close-modal" onClick={onClose}>X</span>
                <h2 className='addfolder-modal-header'>Yeni Klasör Oluştur</h2>
                <input
                    className='addfolder-modal-input'
                    type="text"
                    placeholder="Klasör Adı"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                />
                <div className="addfolder-modal-buttons">
                    <button className='addfolder-modal-button-create' onClick={handleSubmit}>Oluştur</button>
                    <button className='addfolder-modal-button-cancel' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default AddFolderModal;
