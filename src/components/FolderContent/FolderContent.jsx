import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './FolderContent.scss';
import fileIcon from "../../assets/icons/untitled-icon.png";
import { useAuth } from "../../components/AuthProvider";

function FolderContent({ folder, fileIcons, openFileModal, filteredFiles }) {
    const [folderState, setFolderState] = useState(folder);
    const [currentUser, setCurrentUser] = useState(null);
    const fileInputRef = useRef(null);

    const { user } = useAuth();
    const userRole = user && user.access ? user.access.role : null;

    useEffect(() => {
        setCurrentUser(user);
    }, [user]);

    useEffect(() => {
        setFolderState(folder);
    }, [folder]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('files', file);
        if (currentUser) {
            formData.append('uploader', currentUser.id);
        }

        try {
            const uploadResponse = await axios.post('https://bold-animal-facf707bd9.strapiapp.com/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const uploadedFile = uploadResponse.data[0];
            const updatedContent = folderState.folderContent && folderState.folderContent.data
                ? [...folderState.folderContent.data, uploadedFile]
                : [uploadedFile];

            await axios.put(`https://bold-animal-facf707bd9.strapiapp.com/api/project-folders/${folderState.id}`, {
                data: {
                    folderContent: updatedContent.map(file => file.id),
                },
            });

            setFolderState(prevFolder => ({
                ...prevFolder,
                folderContent: { data: updatedContent }
            }));
        } catch (error) {
        }
    };

    const uploadFile = () => {
        fileInputRef.current.click();
    };

    return (
        <div className="folder-content">
            {userRole === "Admin" || userRole === "Contributor" ? (
                <div className="file-input-wrapper" onClick={uploadFile}>
                    <button className="custom-file-upload">Dosya Yükle</button>
                    <input
                        className='file-input'
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileUpload}
                    />
                </div>
            ) :
                null}
            {filteredFiles && filteredFiles.map(file => {
                const fileAttributes = file.attributes || {};
                const fileExt = fileAttributes.ext ? fileAttributes.ext.slice(1).toLowerCase() : '';
                const isImage = ["jpg", "jpeg", "png"].includes(fileExt);
                const iconSrc = isImage ? fileAttributes.formats.thumbnail.url || fileAttributes.url : (fileIcons[fileExt] || fileIcon);

                return (
                    <div key={file.id} className="file-folder-content" onClick={() => openFileModal(file)}>
                        <img
                            className="file-icon-img"
                            src={iconSrc}
                            alt="file-icon"
                        />
                        <span className="file-name">{fileAttributes.name || 'Unknown'}</span>
                        {currentUser?.profilePic && (
                            <div className="uploader-profile-pic-small">
                                <img src={currentUser.profilePic.url} alt="profilepic" className="uploader-profile-pic" />
                                <span className="uploader-name-tooltip">{currentUser.username}</span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default FolderContent;
