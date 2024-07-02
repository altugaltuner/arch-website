import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './FolderContent.scss';
import fileIcon from "../../assets/icons/untitled-icon.png";

function FolderContent({ folder, fileIcons, openFileModal, filteredFiles }) {
    const [folderState, setFolderState] = useState(folder);
    const fileInputRef = useRef(null);

    useEffect(() => {
        setFolderState(folder);
    }, [folder]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('files', file);

        try {
            const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const uploadedFile = uploadResponse.data[0];
            const updatedContent = folderState.folderContent && folderState.folderContent.data
                ? [...folderState.folderContent.data, uploadedFile]
                : [uploadedFile];

            await axios.put(`http://localhost:1337/api/project-folders/${folderState.id}`, {
                data: {
                    folderContent: updatedContent.map(file => file.id),
                },
            });

            setFolderState(prevFolder => ({
                ...prevFolder,
                folderContent: { data: updatedContent }
            }));
        } catch (error) {
            console.error('Error uploading the file', error);
        }
    };

    const uploadFile = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="folder-content">
            <div className="file-input-wrapper" onClick={uploadFile}>
                <button className="custom-file-upload">Dosya Yükle</button>
                <input
                    className='file-input'
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileUpload}
                />
            </div>
            {filteredFiles && filteredFiles.map(file => {
                const fileAttributes = file.attributes || {};
                const fileExt = fileAttributes.ext ? fileAttributes.ext.slice(1).toLowerCase() : '';
                const isImage = ["jpg", "jpeg", "png"].includes(fileExt);
                const iconSrc = isImage ? `http://localhost:1337${fileAttributes.url}` : (fileIcons[fileExt] || fileIcon);

                return (
                    <div key={file.id} className="file-folder-content" onClick={() => openFileModal(file)}>
                        <img
                            className="file-icon-img"
                            src={iconSrc}
                            alt="file-icon"
                        />
                        <span className="file-name">{fileAttributes.name || 'Unknown'}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default FolderContent;
