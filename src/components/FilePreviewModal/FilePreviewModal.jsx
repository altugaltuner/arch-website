import React from 'react';
import "./FilePreviewModal.scss";

function FilePreviewModal({ file, onClose, onDownload }) {
    if (!file) {
        return null;
    }

    return (
        <div className="file-preview-modal">
            <div className="file-preview-modal-content">
                <span className="file-preview-modal-close-btn" onClick={onClose}>X</span>
                <img src={`http://localhost:1337${file.url}`} alt={file.name} className="file-preview-image" />
                <p className='file-preview-file-name'>{file.name}</p>
                <div className='file-preview-btns'>
                    <button className='file-preview-modal-download-btn' onClick={onDownload}>İndir</button>
                    <button className="file-preview-modal-cancel-btn" onClick={onClose}>Kapat</button>
                </div>
            </div>
        </div>
    );
}

export default FilePreviewModal;
