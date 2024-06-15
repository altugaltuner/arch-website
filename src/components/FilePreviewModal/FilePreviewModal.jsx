import React from 'react';
import "./FilePreviewModal.scss";

function FilePreviewModal({ file, onClose }) {
    if (!file) {
        return null;
    }

    return (
        <div className="file-preview-modal">
            <div className="file-preview-modal-content">
                <span className="modal-close-btn" onClick={onClose}>X</span>
                <img src={`http://localhost:1337${file.url}`} alt={file.name} className="file-preview-image" />
                <p>{file.name}</p>
                <button className="modal-cancel-btn" onClick={onClose}>İptal</button>
            </div>
        </div>
    );
}

export default FilePreviewModal;
