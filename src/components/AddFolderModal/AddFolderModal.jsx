import React, { useState } from 'react';
import axios from 'axios';
import './AddFolderModal.scss';

function AddFolderModal({ isOpen, onClose, onFolderCreated, userId }) {
    const [folderName, setFolderName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (folderName.trim() === '') {
            setError('Klasör ismi boş olamaz.');
            return;
        }

        try {
            const response = await axios.post('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/personal-folders', {
                data: {
                    folderName,
                    users_permissions_user: userId
                }
            });
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
                    onChange={(e) => {
                        setFolderName(e.target.value);
                        setError('');
                    }}
                />
                {error && <p className="error-message">{error}</p>}
                <div className="addfolder-modal-buttons">
                    <button className='addfolder-modal-button-create' onClick={handleSubmit}>Oluştur</button>
                    <button className='addfolder-modal-button-cancel' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default AddFolderModal;
