import React from 'react';
import "./EditProjectModal.scss";

function EditProjectModal({ showEditModal, onClose, projectToEdit, handleInputChange, handleInputPasswordChange, handleFileChange, handleEditSubmit }) {
    if (!showEditModal || !projectToEdit) {
        return null;
    }

    return (
        <div className="edit-project-modal">
            <div className='edit-project-content'>
                <span
                    className="edit-project-modal-close"
                    onClick={onClose}
                >
                    X
                </span>
                <h2 className="edit-project-adding-header">Projeyi Düzenle</h2>

                <p className='project-p-modall'>Proje Adı</p>
                <input
                    className="edit-project-name-input"
                    type="text"
                    name="projectName"
                    placeholder="Proje Adı"
                    value={projectToEdit.projectName}
                    onChange={handleInputChange}
                />
                <p className='project-p-modall'>Proje Adı</p>
                <input
                    className='edit-project-password-input'
                    type="text"
                    name='projectPassword'
                    placeholder='Yeni Şifre'
                    value={projectToEdit.projectPassword}
                    onChange={handleInputPasswordChange}
                />
                <p className='project-p-modall'>Proje Adı</p>
                <input
                    className="edit-project-cover-photo-input"
                    type="file"
                    name="projectCoverPhoto"
                    onChange={handleFileChange}
                />
                <div className="edit-modal-buttons-row">
                    <button
                        className="edit-modal-button-create"
                        onClick={handleEditSubmit}
                    >
                        Kaydet
                    </button>
                    <button
                        className="edit-modal-button-abort"
                        onClick={onClose}
                    >
                        İptal
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditProjectModal;
