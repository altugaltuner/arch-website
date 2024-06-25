import React from 'react';

function FolderContent({ folder, filePreview, handleFileChange, addFileToFolder, fileIcons, openFileModal }) {
    return (
        <div className="folder-content">
            <div className="file-input-wrapper">
                <label htmlFor="file-upload" className="custom-file-upload">
                    Dosya Yükle
                </label>
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                />
                {filePreview && (
                    <div className="file-preview">
                        <img src={filePreview} alt="Preview" className="preview-image" />
                        <button className="file-preview-upload" onClick={addFileToFolder}>Dosya Yükle</button>
                    </div>
                )}
            </div>
            {folder.folderContent.data.map(file => (
                <div key={file.id} className="file" onClick={() => openFileModal(file)}>
                    <img className="file-icon-img" src={fileIcons[file.attributes.ext.slice(1)] || fileIcon} alt="file-icon" />
                    <span className="file-name">{file.attributes.name}</span>
                </div>
            ))}
        </div>
    );
}

export default FolderContent;
