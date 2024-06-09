import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProjectsMainPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";

function ProjectsMainPage() {
    const auth = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz
    const { fireStoreUser } = useAuth();
    console.log(fireStoreUser);

    const [companyProjects, setCompanyProjects] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({
        projectName: "",
        projectCoverPhoto: null
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
                const response = await axios.get('http://localhost:1337/api/projects?populate=projectCoverPhoto');
                setCompanyProjects(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject({ ...newProject, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewProject({ ...newProject, projectCoverPhoto: e.target.files[0] });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({ projectName: newProject.projectName }));
        if (newProject.projectCoverPhoto) {
            formData.append('files.projectCoverPhoto', newProject.projectCoverPhoto);
        }

        try {
            await axios.post('http://localhost:1337/api/projects', formData);
            setShowModal(false);
            setNewProject({ projectName: "", projectCoverPhoto: null });
            // Refetch projects after adding a new one
            const response = await axios.get('http://localhost:1337/api/projects?populate=projectCoverPhoto');
            setCompanyProjects(response.data.data);
        } catch (error) {
            console.error('Error creating a new project', error);
        }
    };

    return (
        <div className="projects-main-page">
            <Navigation />
            <div className="projects-cards-main-row">
                {companyProjects.map((project) => (
                    <div className="project-cards" key={project.id}>
                        <Link
                            className="project-card"
                            to={`/projects/${project.id}`}
                        >
                            <p className="project-card-name">{project.attributes.projectName}</p>
                            <img
                                className="project-navbar-photos"
                                src={`http://localhost:1337${project.attributes.projectCoverPhoto.data.attributes.url}`}
                                alt=""
                            />
                        </Link>
                    </div>
                ))}

                {roles.map(role => role.attributes.role === "Admin" && (
                    <button
                        className="add-project-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Proje Ekle
                    </button>
                ))}
            </div>

            {showModal && (
                <div className="add-new-project-modal">
                    <div className="add-new-project-modal-content">
                        <span className="new-project-modal-close" onClick={() => setShowModal(false)}>X</span>
                        <h2 className="new-project-adding-header">Yeni Proje Ekle</h2>
                        <input className="project-name-input"
                            type="text"
                            name="projectName"
                            placeholder="Proje Adı"
                            value={newProject.projectName}
                            onChange={handleInputChange}
                        />
                        <input className="project-cover-photo-input"
                            type="file"
                            name="projectCoverPhoto"
                            onChange={handleFileChange}
                        />
                        <div className="adding-modal-buttons-row">
                            <button className="adding-modal-button-create" onClick={handleSubmit}>Oluştur</button>
                            <button className="adding-modal-button-abort" onClick={() => setShowModal(false)}>İptal</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectsMainPage;
