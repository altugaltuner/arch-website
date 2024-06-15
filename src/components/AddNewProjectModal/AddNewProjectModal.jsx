import React from 'react';

function AddNewProjectModal({ show, onClose, newProject, handleInputChange, handleFileChange, handleSubmit }) {
    if (!show) {
        return null;
    }

    return (
        <div className="add-new-project-modal">
            <div className="add-new-project-modal-content">
                <span
                    className="new-project-modal-close"
                    onClick={onClose}
                >
                    X
                </span>
                <h2 className="new-project-adding-header">Yeni Proje Ekle</h2>
                <input
                    className="project-name-input"
                    type="text"
                    name="projectName"
                    placeholder="Proje Adı"
                    value={newProject.projectName}
                    onChange={handleInputChange}
                />
                <input
                    className="project-cover-photo-input"
                    type="file"
                    name="projectCoverPhoto"
                    onChange={handleFileChange}
                />
                <div className="adding-modal-buttons-row">
                    <button
                        className="adding-modal-button-create"
                        onClick={handleSubmit}
                    >
                        Oluştur
                    </button>
                    <button
                        className="adding-modal-button-abort"
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
