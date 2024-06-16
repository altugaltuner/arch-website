import { useState, useEffect } from "react";
import axios from 'axios';
import "./ProjectSection.scss";
import addIcon from "../../assets/icons/add-icon.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import editPencil from "../../assets/icons/edit-pencil.png";
import folderIcon from "../../assets/icons/folder-icon.png";
import docxIcon from "../../assets/icons/docx-icon.png";
import pdfIcon from "../../assets/icons/pdf-logo.png";
import jpgIcon from "../../assets/icons/jpg-icon.png";
import pngIcon from "../../assets/icons/png-logo.png";
import fileIcon from "../../assets/icons/file-icon.png";

function ProjectSection({ clickedProject }) {
    const [projectFolders, setProjectFolders] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fileIcons = {
        "docx": docxIcon,
        "pdf": pdfIcon,
        "jpg": jpgIcon,
        "png": pngIcon,
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

    // Filter project folders based on the clicked project ID
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
            // Refetch project folders after adding a new one
            await fetchProjectFolders();
        } catch (error) {
            console.error('Error creating a new project folder', error);
        }
    };

    function handleDeleteFolder(id) {
        try {
            axios.delete(`http://localhost:1337/api/project-folders/${id}`);
            // Refetch project folders after deleting one
            fetchProjectFolders();
        } catch (error) {
            console.error('Error deleting the project folder', error);
        }
    }

    function handleEditFolder(id) {
        // Implement the edit functionality here
    }

    function openInsideFolder(folder) {
        setParentFolder(currentFolder);
        setCurrentFolder(folder);
    }

    function goBack() {
        setCurrentFolder(parentFolder);
        setParentFolder(null);
    }

    const renderFoldersAndFiles = (folder) => {
        if (!folder) return null;

        return (
            <div className="folder-content">
                {folder.folderContent?.data.map(file => (
                    <div key={file.id} className="file">
                        <img src={fileIcons[file.attributes.ext.slice(1)] || fileIcon} alt="file-icon" />
                        <span>{file.attributes.name}</span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="project-folders">
            {roles.map(role => role.attributes.role === "Admin" && (
                <button
                    className="project-folder"
                    onClick={() => setShowModal(true)} // Show the modal directly on button click
                >
                    Grup Oluştur
                    <img className="project-folder-add-logo" src={addIcon} alt="" />
                </button>
            ))}
            {currentFolder ? (
                <div>
                    <button onClick={goBack}>Geri Dön</button>
                    <h2>{currentFolder.attributes.projectFolderName}</h2>
                    {renderFoldersAndFiles(currentFolder.attributes)}
                </div>
            ) : (
                filteredFolders && filteredFolders.length > 0 ? (
                    filteredFolders.map((folder) => (
                        <div className="project-folder" key={folder.id} onClick={() => openInsideFolder(folder)}>
                            <img
                                className="file-card-delete-btn"
                                src={deleteIcon}
                                alt=""
                                onClick={(e) => { e.stopPropagation(); handleDeleteFolder(folder.id); }}
                            />
                            <img className="file-card-edit-btn" src={editPencil} alt="" onClick={(e) => { e.stopPropagation(); handleEditFolder(folder.id); }} />
                            <h2 className="project-folder-name">{folder.attributes.projectFolderName}</h2>
                            <img
                                className="project-folder-image"
                                src={folderIcon}
                                alt="folder-icon"
                            />
                        </div>
                    ))
                ) : (
                    <p>No folders available for the selected project.</p>
                )
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>X</span>
                        <h2>Yeni Proje Klasörü Oluştur</h2>
                        <input
                            type="text"
                            name="projectFolderName"
                            placeholder="Klasör Adı"
                            value={newFolder.projectFolderName}
                            onChange={handleInputChange}
                        />
                        <div className="buttons-for-modal">
                            <button onClick={handleSubmit}>Oluştur</button>
                            <button onClick={() => setShowModal(false)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectSection;
