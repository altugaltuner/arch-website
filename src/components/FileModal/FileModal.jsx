import React from 'react';

function FileModal({ fileModal, setFileModal, currentFile, fileIcons, handleDeleteFile }) {
    if (!fileModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-modal" onClick={() => setFileModal(false)}>X</span>
                <h2 className="modal-header">{currentFile.attributes.name}</h2>
                <img src={fileIcons[currentFile.attributes.ext.slice(1)] || fileIcon} alt="file-icon" className="file-icon-modal" />
                <div className="buttons-for-modal">
                    <a href={`http://localhost:1337${currentFile.attributes.url}`} download className="download-button">İndir</a>
                    <button className="delete-button" onClick={() => handleDeleteFile(currentFile.id)}>Sil</button>
                </div>
            </div>
        </div>
    );
}

export default FileModal;
