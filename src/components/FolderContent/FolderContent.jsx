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
    console.log("Authenticated User:", user);

    useEffect(() => {
        setCurrentUser(user);
        console.log("Current User in useEffect:", user);
    }, [user]);

    useEffect(() => {
        setFolderState(folder);
        console.log("Folder State:", folder);
    }, [folder]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('files', file);
        if (currentUser) {
            formData.append('uploader', currentUser.id); // Kullanıcı bilgisi ekleniyor
        }
        console.log("Current User at file upload:", currentUser);

        try {
            const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Upload Response:", uploadResponse.data);
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
                        {currentUser && currentUser.profilePic && (
                            <div className="uploader-profile-pic-small">
                                <img src={`http://localhost:1337${currentUser.profilePic.url}`} alt="profilepic" className="uploader-profile-pic" />
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
