import React, { useState } from 'react';
import "./AddNewProjectModal.scss";

function AddNewProjectModal({ show, onClose, newProject, handleInputChange, handleInputPasswordChange, handleFileChange, handleSubmit }) {
    const [error, setError] = useState("");

    if (!show) {
        return null;
    }

    const handleFormSubmit = () => {
        if (!newProject.projectName || !newProject.projectPassword || !newProject.projectCoverPhoto) {
            setError("Lütfen tüm alanları doldurun.");
            return;
        }
        setError("");
        handleSubmit();
        onClose();
    };

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setError("Sadece fotoğraf yükleyin.");
            return false;
        }
        if (file.size > 1024 * 1024) {
            setError("Dosya boyutu 1MB'tan fazla olamaz.");
            return false;
        }
        setError("");
        return true;
    };

    const handleFileChangeWithValidation = (e) => {
        const file = e.target.files[0];
        if (file && validateFile(file)) {
            handleFileChange(e);
        }
    };

    return (
        <div className="add-new-project-modal">
            <div className="add-new-project-modal-content">
                <span
                    className="global-close-button"
                    onClick={onClose}>
                    X
                </span>
                <h2 className="add-new-project-adding-header">Yeni Proje Ekle</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    className="add-new-project-name-input"
                    type="text"
                    name="projectName"
                    placeholder="Proje Adı"
                    value={newProject.projectName}
                    onChange={handleInputChange}
                />
                <input
                    className='add-new-project-password-input'
                    type="text"
                    name='projectPassword'
                    placeholder='şifre üret'
                    value={newProject.projectPassword}
                    onChange={handleInputPasswordChange}
                />
                <input
                    className="add-new-project-cover-photo-input"
                    type="file"
                    name="projectCoverPhoto"
                    onChange={handleFileChangeWithValidation}
                />
                <div className="add-new-project-adding-modal-buttons-row">
                    <button
                        className="add-new-project-modal-button-create"
                        onClick={handleFormSubmit}
                    >
                        Oluştur
                    </button>
                    <button
                        className="add-new-project-adding-modal-button-abort"
                        onClick={onClose}
                    >
                        İptal
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddNewProjectModal;
