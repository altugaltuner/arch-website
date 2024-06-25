import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./MyPersonalFiles.scss";
import folderIcon from "../../assets/icons/folder-icon.png";
import FilePreviewModal from "../FilePreviewModal/FilePreviewModal";
import AddFolderModal from "../AddFolderModal/AddFolderModal";
import DeleteFolderModal from "../DeleteFolderModal/DeleteFolderModal";
import EditFolderModal from "../EditFolderModal/EditFolderModal";
import backButton from "../../assets/icons/back-button.png";
import editPencil from "../../assets/icons/edit-pencil.png";
import deleteIcon from "../../assets/icons/delete-icon.png";

function MyPersonalFiles({ user }) {
    const [personalFolders, setPersonalFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showAddFolderModal, setShowAddFolderModal] = useState(false);
    const [showDeleteFolderModal, setShowDeleteFolderModal] = useState(false);
    const [showEditFolderModal, setShowEditFolderModal] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const [folderToEdit, setFolderToEdit] = useState(null);
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
            const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const uploadedFile = uploadResponse.data[0];
            const updatedContent = [...selectedFolder.personalFolderContent, uploadedFile];

            await axios.put(`http://localhost:1337/api/personal-folders/${selectedFolder.id}`, {
                data: {
                    personalFolderContent: updatedContent.map(file => file.id),
                },
            });

            setPersonalFolders(prevFolders => prevFolders.map(folder => {
                if (folder.id === selectedFolder.id) {
                    return { ...folder, personalFolderContent: updatedContent };
                }
                return folder;
            }));
            setSelectedFolder(prevFolder => ({ ...prevFolder, personalFolderContent: updatedContent }));

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

    const handleAddFolderClick = () => {
        setShowAddFolderModal(true);
    };

    const handleFolderCreated = (newFolder) => {
        console.log('New folder created:', newFolder);
        setPersonalFolders([...personalFolders, newFolder]);
    };

    const handleDeleteFolder = async () => {
        if (!folderToDelete) return;

        try {
            await axios.delete(`http://localhost:1337/api/personal-folders/${folderToDelete.id}`);
            setPersonalFolders(personalFolders.filter(folder => folder.id !== folderToDelete.id));
            setFolderToDelete(null);
            setShowDeleteFolderModal(false);
        } catch (error) {
            console.error('Error deleting the folder:', error);
        }
    };

    const handleEditFolder = async (newName) => {
        if (!folderToEdit) return;

        try {
            await axios.put(`http://localhost:1337/api/personal-folders/${folderToEdit.id}`, {
                data: { folderName: newName }
            });
            setPersonalFolders(personalFolders.map(folder => {
                if (folder.id === folderToEdit.id) {
                    return { ...folder, folderName: newName };
                }
                return folder;
            }));
            setFolderToEdit(null);
            setShowEditFolderModal(false);
        } catch (error) {
            console.error('Error editing the folder:', error);
        }
    };

    const handleFolderClick = (event, folder) => {
        // Eğer tıklama kalem veya çöp kutusu ikonlarına değilse klasörü aç
        if (event.target.classList.contains('folder-editpencil') || event.target.classList.contains('folder-deleteicon')) {
            event.stopPropagation(); // İkonlara tıklamayı durdur
        } else {
            setSelectedFolder(folder);
        }
    };

    const renderFolders = () => {
        return personalFolders.map(folder => (
            <div key={folder.id} className="folder" onClick={(event) => handleFolderClick(event, folder)}>
                <img
                    className="folder-editpencil"
                    src={editPencil}
                    alt="editPencil"
                    onClick={() => {
                        setFolderToEdit(folder);
                        setShowEditFolderModal(true);
                    }}
                />
                <img
                    className="folder-deleteicon"
                    src={deleteIcon}
                    alt="deleteIcon"
                    onClick={() => {
                        setFolderToDelete(folder);
                        setShowDeleteFolderModal(true);
                    }}
                />
                <img src={folderIcon} alt="folder" className="folder-icon" />
                <p className="folder-p">{folder.folderName || (folder.attributes && folder.attributes.folderName)}</p>
            </div>
        ));
    };

    const renderFolderContent = (folder) => {
        return (
            <div className="folder-content">
                <img className="back-button" src={backButton} alt="back" onClick={() => setSelectedFolder(null)} />
                <h3 className="folder-header">{folder.folderName || (folder.attributes && folder.attributes.folderName)}</h3>
                <div className="files">
                    {folder.personalFolderContent && folder.personalFolderContent.map(file => (
                        <div key={file.id} className="file" onClick={() => showFilePreview(file)}>
                            {file.formats && file.formats.thumbnail ? (
                                <img className="files-img" src={`http://localhost:1337${file.formats.thumbnail.url}`} alt={file.name} />
                            ) : (
                                <span>{file.name}</span>
                            )}
                        </div>
                    ))}
                </div>
                <button className="upload-file-button" onClick={() => uploadFile(folder.id)}>Dosya Yükle</button>
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
            <button className="add-folder-button" onClick={handleAddFolderClick}>Yeni Klasör</button>
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
            <AddFolderModal
                isOpen={showAddFolderModal}
                onClose={() => setShowAddFolderModal(false)}
                onFolderCreated={handleFolderCreated}
                userId={user.id}
            />
            <DeleteFolderModal
                isOpen={showDeleteFolderModal}
                onClose={() => setShowDeleteFolderModal(false)}
                onDelete={handleDeleteFolder}
            />
            <EditFolderModal
                isOpen={showEditFolderModal}
                onClose={() => setShowEditFolderModal(false)}
                onEdit={handleEditFolder}
                initialName={folderToEdit ? folderToEdit.folderName : ''}
            />
        </div>
    );
}

export default MyPersonalFiles;
