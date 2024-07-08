import React from 'react';
import "./AddNewProjectModal.scss";

function AddNewProjectModal({ show, onClose, newProject, handleInputChange, handleInputPasswordChange, handleFileChange, handleSubmit }) {
    if (!show) {
        return null;
    }

    return (
        <div className="add-new-project-modal">
            <div className="add-new-project-modal-content">
                <span
                    className="add-new-project-modal-close"
                    onClick={onClose}
                >
                    X
                </span>
                <h2 className="add-new-project-adding-header">Yeni Proje Ekle</h2>
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
                    onChange={handleFileChange}
                />
                <div className="add-new-project-adding-modal-buttons-row">
                    <button
                        className="add-new-project-modal-button-create"
                        onClick={handleSubmit}
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
