import { useState, useEffect } from "react";
import "./ProjectSection.scss";
import axios from 'axios';
import deleteIcon from "../../assets/icons/delete-icon.png";
import editPencil from "../../assets/icons/edit-pencil.png";
import folderIcon from "../../assets/icons/folder-icon.png";
import docxIcon from "../../assets/icons/docx-icon.png";
import pdfIcon from "../../assets/icons/pdf-logo.png";
import jpgIcon from "../../assets/icons/jpg-icon.png";
import pngIcon from "../../assets/icons/png-logo.png";
import dwgIcon from "../../assets/icons/dwg-icon.png";
import fileIcon from "../../assets/icons/file-icon.png";
import goBackButton from "../../assets/icons/back-button.png";
import DeleteFolderModal from "../GroupModals/DeleteFolderModal";

function ProjectSection({ clickedProject }) {
    const [projectFolders, setProjectFolders] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [fileModal, setFileModal] = useState(false);
    const [currentFile, setCurrentFile] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [folderToDelete, setFolderToDelete] = useState(null);
    const [folderToEdit, setFolderToEdit] = useState(null);
    const [newFolderName, setNewFolderName] = useState("");

    const fileIcons = {
        "docx": docxIcon,
        "pdf": pdfIcon,
        "jpg": jpgIcon,
        "png": pngIcon,
        "dwg": dwgIcon
    };

    const [newFolder, setNewFolder] = useState({
        projectFolderName: ""
    });
    const [currentFolder, setCurrentFolder] = useState(null);
    const [parentFolder, setParentFolder] = useState(null);

    async function getRoles() {
        try {
            const response = await axios.get('http://localhost:1337/api/accesses');
            setRoles(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

    const fetchProjectFolders = async () => {
        try {
            const response = await axios.get('http://localhost:1337/api/projects?populate=project_folders.folderContent');
            setProjectFolders(response.data.data);
        } catch (error) {
            console.error('Error fetching the data', error);
        }
    };

    useEffect(() => {
        fetchProjectFolders();
    }, []);

    const filteredFolders = clickedProject
        ? projectFolders.find((project) => project.id === clickedProject.id)?.attributes.project_folders.data
        : [];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFolder({ ...newFolder, [name]: value });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            projectFolderName: newFolder.projectFolderName,
            project: clickedProject.id
        }));

        try {
            await axios.post('http://localhost:1337/api/project-folders', formData);
            setShowModal(false);
            setNewFolder({ projectFolderName: "" });
            await fetchProjectFolders();
        } catch (error) {
            console.error('Error creating a new project folder', error);
        }
    };

    const handleDeleteFolder = async () => {
        if (folderToDelete) {
            try {
                await axios.delete(`http://localhost:1337/api/project-folders/${folderToDelete}`);
                setShowDeleteModal(false);
                setFolderToDelete(null);
                await fetchProjectFolders();
            } catch (error) {
                console.error('Error deleting the project folder', error);
            }
        }
    };

    const handleDeleteFile = async (fileId) => {
        try {
            await axios.delete(`http://localhost:1337/api/upload/files/${fileId}`);
            setFileModal(false);
            await fetchProjectFolders();
        } catch (error) {
            console.error('Error deleting the file', error);
        }
    };

    const handleEditFolder = (id) => {
        const folder = projectFolders.find((project) =>
            project.attributes.project_folders.data.some((folder) => folder.id === id)
        )?.attributes.project_folders.data.find((folder) => folder.id === id);

        setFolderToEdit(folder);
        setNewFolderName(folder.attributes.projectFolderName);
        setEditModal(true);
    };

    const handleEditSubmit = async () => {
        if (folderToEdit) {
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                projectFolderName: newFolderName
            }));

            try {
                await axios.put(`http://localhost:1337/api/project-folders/${folderToEdit.id}`, formData);
                setEditModal(false);
                setFolderToEdit(null);
                setNewFolderName("");
                await fetchProjectFolders();
            } catch (error) {
                console.error('Error editing the project folder', error);
            }
        }
    };

    function openInsideFolder(folder) {
        console.log("Opening folder:", folder);
        setParentFolder(currentFolder);
        setCurrentFolder(folder);
    }

    function goBack() {
        setCurrentFolder(parentFolder);
        setParentFolder(null);
    }

    const addFileToFolder = async () => {
        console.log("Attempting to add file to folder...");
        if (!selectedFile || !currentFolder) {
            console.log("No file selected or no current folder.");
            return;
        }

        console.log("Current folder ID:", currentFolder.id);
        console.log("Selected file:", selectedFile.name);

        const formData = new FormData();
        formData.append('files', selectedFile);
        formData.append('ref', 'project-folders');
        formData.append('refId', currentFolder.id);
        formData.append('field', 'folderContent');

        try {
            const response = await axios.post('http://localhost:1337/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully:', response.data);
            await fetchProjectFolders();
            setSelectedFile(null);
            setFilePreview(null);
        } catch (error) {
            console.error('Error uploading the file:', error.response ? error.response.data : error.message);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file) {
            console.log("File selected:", file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const renderFoldersAndFiles = (folder) => {
        if (!folder || !folder.folderContent || !folder.folderContent.data) {
            return (
                <div className="folder-content">
                    <p className="folder-content-nocontent-p">Henüz dosya yüklenmedi.</p>
                    <button className="file-preview-upload" onClick={addFileToFolder}>Dosya Yükle</button>
                </div>
            );
        };

        const openFileModal = (file) => {
            setCurrentFile(file);
            setFileModal(true);
        };

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
    };

    return (
        <div className="project-folders">
            {!currentFolder && roles.map(role => role.attributes.role === "Admin" && (
                <button
                    className="project-folder-button"
                    onClick={() => setShowModal(true)}
                >
                    Klasör Oluştur
                </button>
            ))}
            {currentFolder ? (
                <div className="current-folders-div">
                    <div className="current-folders-div-2">
                        <button className="go-back-btn" onClick={goBack}>
                            <img src={goBackButton} alt="" className="go-back-btn-img" />
                        </button>
                        <h2 className="current-folder-header">{currentFolder.attributes.projectFolderName}</h2>

                    </div>

                    {renderFoldersAndFiles(currentFolder.attributes)}
                </div>
            ) : (
                filteredFolders && filteredFolders.length > 0 ? (
                    filteredFolders.map((folder) => (
                        <div className="project-folder" key={folder.id} onClick={() => openInsideFolder(folder)}>
                            <img
                                className="file-card-delete-btn"
                                src={deleteIcon}
                                alt="delete-icon"
                                onClick={(e) => { e.stopPropagation(); setFolderToDelete(folder.id); setShowDeleteModal(true); }}
                            />
                            <img className="file-card-edit-btn" src={editPencil} alt="edit-icon" onClick={(e) => { e.stopPropagation(); handleEditFolder(folder.id); }} />
                            <h2 className="project-folder-name">{folder.attributes.projectFolderName}</h2>
                            <img
                                className="project-folder-image"
                                src={folderIcon}
                                alt="folder-icon"
                            />
                        </div>
                    ))
                ) : (
                    <p>Bu projede henüz dosya yok.</p>
                )
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={() => setShowModal(false)}>X</span>
                        <h2 className="modal-header">Yeni Proje Klasörü Oluştur</h2>
                        <input
                            className="input-field"
                            type="text"
                            name="projectFolderName"
                            placeholder="Klasör Adı"
                            value={newFolder.projectFolderName}
                            onChange={handleInputChange}
                        />
                        <div className="buttons-for-modal">
                            <button className="submit-button" onClick={handleSubmit}>Oluştur</button>
                            <button className="cancel-button" onClick={() => setShowModal(false)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}

            {fileModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={() => setFileModal(false)}>X</span>
                        <h2 className="modal-header">{currentFile.attributes.name}</h2>
                        <img src={fileIcons[currentFile.attributes.ext.slice(1)] || fileIcon} alt="file-icon" className="file-icon-modal" />
                        <div className="buttons-for-modal">
                            <a href={`http://localhost:1337${currentFile.attributes.url}`} download className="download-button">İndir</a>
                            <button className="delete-button" onClick={() => handleDeleteFile(currentFile.id)}>Sil</button>
                        </div>
                    </div>
                </div>
            )}

            {editModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={() => setEditModal(false)}>X</span>
                        <h2 className="modal-header">Klasörü Düzenle</h2>
                        <input
                            className="input-field"
                            type="text"
                            placeholder="Klasör Adı"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                        />
                        <div className="buttons-for-modal">
                            <button className="submit-button" onClick={handleEditSubmit}>Kaydet</button>
                            <button className="cancel-button" onClick={() => setEditModal(false)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <DeleteFolderModal
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    handleDeleteFolder={handleDeleteFolder}
                />
            )}
        </div>
    );
}

export default ProjectSection;
