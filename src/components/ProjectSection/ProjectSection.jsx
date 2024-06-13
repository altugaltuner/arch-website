import { useState, useEffect } from "react";
import axios from 'axios';
import "./ProjectSection.scss";
import addIcon from "../../assets/icons/add-icon.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import editPencil from "../../assets/icons/edit-pencil.png";
import folderIcon from "../../assets/icons/folder-icon.png";

function ProjectSection({ clickedProject }) {
    const [projectFolders, setProjectFolders] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newFolder, setNewFolder] = useState({
        projectFolderName: ""
    });

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
            const response = await axios.get('http://localhost:1337/api/projects?populate=project_folders');
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

    function openInsideFolder(id) {
        // Implement the functionality to open the folder here
        console.log(`Opening folder with ID: ${id}`);
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
            {filteredFolders && filteredFolders.length > 0 ? (
                filteredFolders.map((folder) => (
                    <div className="project-folder" key={folder.id} onClick={() => openInsideFolder(folder.id)}>
                        <img
                            className="file-card-delete-btn"
                            src={deleteIcon}
                            alt=""
                            onClick={() => handleDeleteFolder(folder.id)}
                        />
                        <img className="file-card-edit-btn" src={editPencil} alt="" />

                        <h2 className="project-folder-name">{folder.attributes.projectFolderName}</h2>
                        <img
                            className="project-folder-image"
                            src={folderIcon}
                            alt="folder-icon"
                            key={folder.id} // Add the key prop here
                        />
                    </div>
                ))
            ) : (
                <p>No folders available for the selected project.</p>
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
                        <button onClick={handleSubmit}>Oluştur</button>
                        <button onClick={() => setShowModal(false)}>İptal</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectSection;
