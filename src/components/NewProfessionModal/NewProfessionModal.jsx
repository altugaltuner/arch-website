import React, { useState } from 'react';
import "./NewProfessionModal.scss";

function NewProfessionModal({ isOpen, onClose, onAdd }) {
    const [professionName, setProfessionName] = useState('');

    const handleAddProfession = async () => {
        if (professionName.trim() === "") {
            alert("Meslek adı boş olamaz!");
            return;
        }
        try {
            await onAdd(professionName); // professionName'i parametre olarak iletin
            setProfessionName(''); // Formu temizleyin
        } catch (error) {
            console.error("Error adding profession:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="new-profession-modal-overlay">
            <div className="new-profession-modal-main">
                <button className="global-close-button" onClick={onClose}>X</button>
                <h2 className='modal-header'>Yeni Meslek Ekle</h2>
                <input
                    className='new-pro-input'
                    type="text"
                    placeholder="Meslek Adı"
                    value={professionName}
                    onChange={(e) => setProfessionName(e.target.value)}
                />
                <div className='new-pro-button-div'>
                    <button className='confirm-button' onClick={handleAddProfession}>Ekle</button>
                    <button className='cancel-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default NewProfessionModal;
