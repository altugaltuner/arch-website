import React from 'react';
import './EditProjectFolderModal.scss';

function EditProjectFolderModal({ showEditModal, setEditModal, newFolderName, setNewFolderName, handleEditSubmit }) {
    if (!showEditModal) return null;

    return (
        <div className="edit-project-folder-modal">
            <div className="edit-project-folder-modal-content">
                <span className="global-close-button" onClick={() => setEditModal(false)}>X</span>
                <h2 className="modal-header">Klasörü Düzenle</h2>
                <input
                    className="edit-project-folder-input-field"
                    type="text"
                    placeholder="Klasör Adı"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                />
                <div className="edit-project-folder-buttons-for-modal">
                    <button className="confirm-button" onClick={handleEditSubmit}>Kaydet</button>
                    <button className="cancel-button" onClick={() => setEditModal(false)}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default EditProjectFolderModal;
