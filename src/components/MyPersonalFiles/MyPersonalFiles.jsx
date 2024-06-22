import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./MyPersonalFiles.scss";
import folderIcon from "../../assets/icons/folder-icon.png";
import FilePreviewModal from "../FilePreviewModal/FilePreviewModal";
import backButton from "../../assets/icons/back-button.png";

function MyPersonalFiles({ user }) {
    const [personalFolders, setPersonalFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!user || !user.id) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/users/${user.id}?populate=personal_folders.personalFolderContent`);
                setPersonalFolders(response.data.personal_folders);
            } catch (error) {
                console.error('Error fetching the data', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('files', file);

        try {
            // Step 1: Upload the file
            const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const uploadedFile = uploadResponse.data[0];

            // Step 2: Update the folder content in the database
            const folderResponse = await axios.patch(`http://localhost:1337/api/folders/${selectedFolder.id}`, {
                personalFolderContent: [...selectedFolder.personalFolderContent, uploadedFile],
            });

            const updatedFolder = folderResponse.data;

            // Step 3: Update the local state
            const updatedFolders = personalFolders.map(folder => {
                if (folder.id === selectedFolder.id) {
                    return updatedFolder;
                }
                return folder;
            });
            setPersonalFolders(updatedFolders);

        } catch (error) {
            console.error('Error uploading the file', error);
        }
    };



    const uploadFile = (folderId) => {
        setSelectedFolder(personalFolders.find(folder => folder.id === folderId));
        fileInputRef.current.click();
    };

    const showFilePreview = (file) => {
        setSelectedFile(file);
    };

    const closeFilePreview = () => {
        setSelectedFile(null);
    };

    const downloadFile = () => {
        if (selectedFile) {
            window.open(`http://localhost:1337${selectedFile.url}`, '_blank');
        }
    };

    const renderFolders = () => {
        return personalFolders.map(folder => (
            <div key={folder.id} className="folder" onClick={() => setSelectedFolder(folder)}>
                <img src={folderIcon} alt="folder" className="folder-icon" />
                <p className="folder-p">{folder.folderName}</p>
            </div>
        ));
    };

    const renderFolderContent = (folder) => {
        return (
            <div className="folder-content">
                <img className="back-button" src={backButton} alt="back" onClick={() => setSelectedFolder(null)} />
                <h3 className="folder-header">{folder.folderName}</h3>
                <div className="files">
                    {folder.personalFolderContent.map(file => (
                        <div key={file.id} className="file" onClick={() => showFilePreview(file)}>
                            {file.formats && file.formats.thumbnail ? (
                                <img className="files-img" src={`http://localhost:1337${file.formats.thumbnail.url}`} alt={file.name} />
                            ) : (
                                <span>{file.name}</span>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={() => uploadFile(folder.id)}>Dosya Yükle</button>
            </div>
        );
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user || !user.id) {
        return <div>No user data available.</div>;
    }

    return (
        <div className="my-files-panel">
            <h2 className="my-files-panel-header">Dosyalarım</h2>
            <div className="folders">
                {selectedFolder ? renderFolderContent(selectedFolder) : renderFolders()}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
            {selectedFile && <FilePreviewModal file={selectedFile} onClose={closeFilePreview} onDownload={downloadFile} />}
        </div>
    );
}

export default MyPersonalFiles;
