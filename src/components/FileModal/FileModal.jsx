import React from 'react';
import './FileModal.scss';
import fileIcon from "../../assets/icons/untitled-icon.png";
import { useAuth } from "../../components/AuthProvider";

function FileModal({ fileModal, setFileModal, currentFile, fileIcons, handleDeleteFile }) {
    if (!fileModal) return null;

    const { user } = useAuth();
    const fileExt = currentFile.attributes.ext.slice(1).toLowerCase();
    const isImage = ["jpg", "jpeg", "png"].includes(fileExt);
    const userRole = user && user.access ? user.access.role : null;

    const handleDownload = () => {
        const fileUrl = `${currentFile.attributes.url}`;

        fetch(fileUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    const link = document.createElement('a');
                    link.href = fileUrl;
                    link.setAttribute('download', currentFile.attributes.name);
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                } else {
                    alert("File not found. Please check the file URL.");
                }
            })
            .catch(() => {
                alert("An error occurred while trying to download the file.");
            });
    };


    return (
        <div className="file-modal">
            <div className="file-modal-content">
                <span className="global-close-button" onClick={() => setFileModal(false)}>X</span>
                <h2 className="file-modal-header">{currentFile.attributes.name}</h2>
                {isImage ? (
                    <img src={currentFile.attributes.url} alt="file" className="file-icon-modal" />
                ) : (
                    <img src={fileIcons[fileExt] || fileIcon} alt="file-icon" className="file-icon-modal" />
                )}
                <div className="file-buttons-for-modal">
                    <button className="confirm-button" onClick={handleDownload}>İndir</button>
                    {userRole === "Admin" && (
                        <button className="cancel-button" onClick={() => handleDeleteFile(currentFile.id)}>Sil</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileModal;
