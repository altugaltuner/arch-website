import React, { useState } from 'react';
import './NewReviseModal.scss';

function NewReviseModal({ isOpen, onClose }) {
    const [inputValue, setInputValue] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Input Value:', inputValue);
        // İşlem burada yapılacak (örneğin, API çağrısı)
        onClose(); // Modal'ı kapatma
    };

    return (
        <div className="new-revise-modal">
            <div className="revise-modal-content">
                <h2 className='new-revise-modal-header'>Yeni Revize Ekle</h2>
                <form className='new-revise-modal-form' onSubmit={handleSubmit}>
                    <input
                        className='new-revise-modal-input'
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Revize girin"
                    />
                    <div className='new-revise-buttons-div'>
                        <button className='new-revise-submit-btn' type="submit">Gönder</button>
                        <button className='new-revise-submit-cancel' onClick={onClose}>Kapat</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewReviseModal;
