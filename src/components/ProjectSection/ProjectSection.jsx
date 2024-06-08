import { useState, useEffect } from "react";
import axios from 'axios';
import "./ProjectSection.scss";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate=*');
                setProjectFolders(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
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
        formData.append('data', JSON.stringify({ projectFolderName: newFolder.projectFolderName }));

        try {
            await axios.post('http://localhost:1337/api/project-folders', formData);
            setShowModal(false);
            setNewFolder({ projectFolderName: "" });
            // Refetch project folders after adding a new one
            const response = await axios.get('http://localhost:1337/api/projects?populate=*');
            setProjectFolders(response.data.data);
        } catch (error) {
            console.error('Error creating a new project folder', error);
        }
    };

    return (
        <div className="project-folders">
            {roles.map(role => role.attributes.role === "Admin" && (
                <button
                    className="project-folder"
                    onClick={() => setShowModal(true)}
                >
                    Grup Oluştur
                </button>
            ))}
            {filteredFolders && filteredFolders.length > 0 ? (
                filteredFolders.map((folder) => (
                    <div className="project-folder" key={folder.id}>
                        <h2 className="project-folder-name">{folder.attributes.projectFolderName}</h2>
                        <img
                            className="project-folder-image"
                            src="https://w7.pngwing.com/pngs/603/506/png-transparent-directory-icon-computer-file-folder-miscellaneous-angle-image-file-formats.png"
                            alt="folder-icon"
                        />
                    </div>
                ))
            ) : (
                <p>No folders available for the selected project.</p>
            )}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
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
