import React, { useState } from 'react';
import './NewFolderModal.scss';

function NewFolderModal({ showModal, setShowModal, newFolder, handleInputChange, handleSubmit }) {
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChangeWithError = (e) => {
        handleInputChange(e);
        if (e.target.value.trim() === '') {
            setErrorMessage('Klasör ismi boş olamaz');
        } else {
            setErrorMessage('');
        }
    };

    const handleSubmitWithError = () => {
        if (newFolder.projectFolderName.trim() === '') {
            setErrorMessage('Klasör ismi boş olamaz');
        } else {
            handleSubmit();
            setErrorMessage('');
        }
    };

    if (!showModal) return null;

    return (
        <div className="new-folder-modal">
            <div className="new-folder-modal-content">
                <span className="global-close-button" onClick={() => setShowModal(false)}>X</span>
                <h2 className="modal-header">Yeni Proje Klasörü Oluştur</h2>
                <input
                    className="new-folder-input-field"
                    type="text"
                    name="projectFolderName"
                    placeholder="Klasör Adı"
                    value={newFolder.projectFolderName}
                    onChange={handleInputChangeWithError}
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="new-folder-buttons-for-modal">
                    <button className="confirm-button" onClick={handleSubmitWithError}>Oluştur</button>
                    <button className="cancel-button" onClick={() => setShowModal(false)}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default NewFolderModal;
