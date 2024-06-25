import React from 'react';
import './FileModal.scss';

function FileModal({ fileModal, setFileModal, currentFile, fileIcons, handleDeleteFile }) {
    if (!fileModal) return null;

    return (
        <div className="file-modal">
            <div className="file-modal-content">
                <span className="file-close-modal" onClick={() => setFileModal(false)}>X</span>
                <h2 className="file-modal-header">{currentFile.attributes.name}</h2>
                <img src={fileIcons[currentFile.attributes.ext.slice(1)] || fileIcon} alt="file-icon" className="file-icon-modal" />
                <div className="file-buttons-for-modal">
                    <a href={`http://localhost:1337${currentFile.attributes.url}`} download className="file-download-button">İndir</a>
                    <button className="file-delete-button" onClick={() => handleDeleteFile(currentFile.id)}>Sil</button>
                </div>
            </div>
        </div>
    );
}

export default FileModal;
