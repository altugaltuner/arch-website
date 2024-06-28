import React, { useState } from 'react';
import axios from 'axios';
import "./NewProfessionModal.scss";

function NewProfessionModal({ isOpen, onClose, onAdd }) {
    const [professionName, setProfessionName] = useState('');

    const handleAddProfession = async () => {
        try {
            const response = await axios.post('http://localhost:1337/api/professions', {
                data: {
                    professionName,
                },
            });
            console.log('Yeni meslek türü eklendi:', response.data);
            onAdd();
        } catch (error) {
            console.error('Meslek türü eklenemedi:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="new-profession-modal-overlay">
            <div className="new-profession-modal-main">
                <button className="modal-close-button" onClick={onClose}>X</button>
                <h2 className='new-pro-header'>Yeni Meslek Ekle</h2>
                <input
                    className='new-pro-input'
                    type="text"
                    placeholder="Meslek Adı"
                    value={professionName}
                    onChange={(e) => setProfessionName(e.target.value)}
                />
                <div className='new-pro-button-div'>
                    <button className='new-pro-button' onClick={handleAddProfession}>Ekle</button>
                    <button className='new-pro-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default NewProfessionModal;
