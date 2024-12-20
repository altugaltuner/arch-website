import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./MyPersonalFiles.scss";
import folderIcon from "../../assets/icons/folder-icon.png";
import FilePreviewModal from "../FilePreviewModal/FilePreviewModal";
import AddFolderModal from "../AddFolderModal/AddFolderModal";
import EditFolderModal from "../EditFolderModal/EditFolderModal";
import DeleteFolderModal from "../DeleteFolderModal/DeleteFolderModal";
import backButton from "../../assets/icons/back-button.png";
import editPencil from "../../assets/icons/edit-pencil.png";
import deleteIcon from "../../assets/icons/delete-icon.png";

function MyPersonalFiles({ user }) {
    const [personalFolders, setPersonalFolders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showAddFolderModal, setShowAddFolderModal] = useState(false);
    const [showEditFolderModal, setShowEditFolderModal] = useState(false);
    const [showDeleteFolderModal, setShowDeleteFolderModal] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const [folderToEdit, setFolderToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (!user || !user.id) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {

            try {
                const response = await axios.get(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/users/${user.id}?populate=personal_folders.personalFolderContent`);
                const folders = response.data.personal_folders || [];
                const formattedFolders = folders.map(folder => ({
                    ...folder,
                    personalFolderContent: folder.personalFolderContent || []
                }));
                setPersonalFolders(formattedFolders);
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);


    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('files', file);

        try {
            const uploadResponse = await axios.post('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const uploadedFile = uploadResponse.data[0];
            if (!selectedFolder) {
                return;
            }
            const updatedContent = [...(selectedFolder.personalFolderContent || []), uploadedFile];

            await axios.put(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/personal-folders/${selectedFolder.id}`, {
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
        }
    };

    const showFilePreview = (file) => {
        setSelectedFile(file);
    };

    const closeFilePreview = () => {
        setSelectedFile(null);
    };

    const downloadFile = () => {
        if (selectedFile) {
            window.open(`https://wonderful-pleasure-64045d06ec.strapiapp.com${selectedFile.url}`, '_blank');
        }
    };

    const handleFileDelete = async (fileId) => {
        try {
            await axios.delete(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/upload/files/${fileId}`);
            const updatedFolderContent = selectedFolder.personalFolderContent.filter(file => file.id !== fileId);

            await axios.put(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/personal-folders/${selectedFolder.id}`, {
                data: { personalFolderContent: updatedFolderContent.map(file => file.id) }
            });

            setPersonalFolders(prevFolders => prevFolders.map(folder => {
                if (folder.id === selectedFolder.id) {
                    return { ...folder, personalFolderContent: updatedFolderContent };
                }
                return folder;
            }));
            setSelectedFolder(prevFolder => ({ ...prevFolder, personalFolderContent: updatedFolderContent }));
            setSelectedFile(null);
        } catch (error) {
        }
    };

    const handleAddFolderClick = () => {
        setShowAddFolderModal(true);
    };

    const handleFolderCreated = (newFolder) => {
        setPersonalFolders([...personalFolders, newFolder]);
    };

    const handleDeleteFolder = async () => {
        if (!folderToDelete) return;

        try {
            await axios.delete(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/personal-folders/${folderToDelete.id}`);
            setPersonalFolders(personalFolders.filter(folder => folder.id !== folderToDelete.id));
            setFolderToDelete(null);
        } catch (error) {
        }
    };

    const handleEditFolder = async (newName) => {
        if (!folderToEdit) return;

        try {
            await axios.put(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/personal-folders/${folderToEdit.id}`, {
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
        }
    };

    const handleFolderClick = (event, folder) => {
        if (event.target.classList.contains('folder-editpencil') || event.target.classList.contains('folder-deleteicon')) {
            event.stopPropagation();
        } else {
            setSelectedFolder(folder);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
        if (!folder || !folder.personalFolderContent) {
            return (
                <div className="folder-content">
                    <img className="back-button" src={backButton} alt="back" onClick={() => setSelectedFolder(null)} />
                    <h3 className="folder-header">{folder.folderName || (folder.attributes && folder.attributes.folderName)}</h3>
                    <p>Klasör boş.</p>
                    <input
                        className="search-input"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Dosya ara..."
                        autoComplete="off"
                    />
                    <button className="upload-file-button" onClick={() => uploadFile(folder.id)}>Dosya Yükle</button>
                </div>
            );
        }
        const filteredFiles = folder.personalFolderContent.filter(file =>
            file.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const uploadFile = (folderId) => {
            const folder = personalFolders.find(folder => folder.id === folderId);
            if (!folder) {
                return;
            }
            setSelectedFolder(folder);
            fileInputRef.current.click();
        };

        return (
            <div className="folder-content">
                <img className="back-button" src={backButton} alt="back" onClick={() => setSelectedFolder(null)} />
                <h3 className="folder-header">{folder.folderName || (folder.attributes && folder.attributes.folderName)}</h3>

                <input
                    className="search-input"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Dosya ara..."
                    autoComplete="off"
                />

                <div className="files">
                    <button className="upload-file-button" onClick={() => uploadFile(folder.id)}>Dosya Yükle</button>
                    {filteredFiles.map(file => (
                        <div key={file.id} className="file" onClick={() => showFilePreview(file)}>
                            {file.formats && file.formats.thumbnail ? (
                                <img className="files-img" src={file.formats.thumbnail.url || file.url} alt={file.name} />
                            ) : (
                                <span>{file.name}</span>
                            )}
                            <p className="file-name">{file.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    if (isLoading) {
        return <div>Yükleniyor...</div>;
    }

    if (!user || !user.id) {
        return <div>Kullanıcı Bilgisi Bulunamadı.</div>;
    }

    return (
        <div className="my-files-panel">
            <h2 className="div-header">Dosyalarım</h2>
            <button className="yellow-button" onClick={handleAddFolderClick}>Yeni Klasör</button>
            <div className="folders">
                {selectedFolder ? renderFolderContent(selectedFolder) : renderFolders()}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
            {selectedFile && (
                <FilePreviewModal
                    file={selectedFile}
                    onClose={closeFilePreview}
                    onDownload={downloadFile}
                    onDelete={handleFileDelete}
                />
            )}
            <AddFolderModal
                isOpen={showAddFolderModal}
                onClose={() => setShowAddFolderModal(false)}
                onFolderCreated={handleFolderCreated}
                userId={user.id}
            />
            <EditFolderModal
                isOpen={showEditFolderModal}
                onClose={() => setShowEditFolderModal(false)}
                onEdit={handleEditFolder}
                initialName={folderToEdit ? folderToEdit.folderName : ''}
            />
            <DeleteFolderModal
                isOpen={showDeleteFolderModal}
                onClose={() => setShowDeleteFolderModal(false)}
                onDelete={handleDeleteFolder}
            />
        </div>
    );
}

export default MyPersonalFiles;
