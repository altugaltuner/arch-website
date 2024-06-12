import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ProjectsMainPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";

function ProjectsMainPage() {
    const { user } = useAuth();
    console.log(user);

    const [companyProjects, setCompanyProjects] = useState([]);
    const [deleteIcon, setDeleteIcon] = useState([]);
    const [editIcon, setEditIcon] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProject, setNewProject] = useState({
        projectName: "",
        projectCoverPhoto: null,
    });

    async function getRoles() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            const response = await axios.get("http://localhost:1337/api/accesses");
            console.log("Roles response:", response.data); // API yanıtını kontrol et
            setRoles(response.data.data);
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getRoles();
        }
    }, []);

    async function getDeleteIcon() {
        try {
            const response = await axios.get('http://localhost:1337/api/website-uis/7?populate=*');
            console.log("Delete icon response:", response.data.data);
            setDeleteIcon(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDeleteIcon();
    }, []);

    async function getEditIcon() {
        try {
            const response = await axios.get('http://localhost:1337/api/website-uis/8?populate=*');
            console.log("Edit icon response:", response.data.data);
            setEditIcon(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getEditIcon();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found in localStorage");
                    return;
                }

                const response = await axios.get(
                    "http://localhost:1337/api/projects?populate=projectCoverPhoto"
                );
                console.log("Projects response:", response.data); // API yanıtını kontrol et
                setCompanyProjects(response.data.data);
            } catch (error) {
                console.error("Error fetching the data:", error);
            }
        };

        if (localStorage.getItem("token")) {
            fetchData();
        }
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
        formData.append(
            "data",
            JSON.stringify({ projectName: newProject.projectName })
        );
        if (newProject.projectCoverPhoto) {
            formData.append("files.projectCoverPhoto", newProject.projectCoverPhoto);
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found in localStorage");
                return;
            }

            await axios.post("http://localhost:1337/api/projects", formData);
            setShowModal(false);
            setNewProject({ projectName: "", projectCoverPhoto: null });
            // Refetch projects after adding a new one
            const response = await axios.get(
                "http://localhost:1337/api/projects?populate=projectCoverPhoto",
            );
            setCompanyProjects(response.data.data);
        } catch (error) {
            console.error("Error creating a new project:", error);
        }
    };

    function deleteProjectFromDatabase(id) {
        axios.delete(`http://localhost:1337/api/projects/${id}`)
            .then((response) => {
                console.log(response);
                console.log("Project deleted successfully");
                setCompanyProjects(companyProjects.filter(project => project.id !== id));
            })
            .catch((error) => {
                console.error("Error deleting project:", error);
            });
    }

    return (
        <div className="projects-main-page">
            <Navigation />
            <div className="projects-cards-main-row">
                {companyProjects.length > 0 ? (
                    companyProjects.map((project) => (
                        <div className="project-cards" key={project.id}>
                            <Link className="project-card" to={`/projects/${project.id}`}>
                                <img
                                    className="project-card-delete-btn"
                                    src={`http://localhost:1337${deleteIcon.attributes.LogoImg.data[0].attributes.formats.thumbnail.url}`}
                                    alt=""
                                    onClick={() => deleteProjectFromDatabase(project.id)}
                                />
                                <img className="project-card-edit-btn" src={`http://localhost:1337${editIcon.attributes.LogoImg.data[0].attributes.formats.thumbnail.url}`} alt="" />
                                <p className="project-card-name">
                                    {project.attributes.projectName}
                                </p>
                                {project.attributes.projectCoverPhoto &&
                                    project.attributes.projectCoverPhoto.data && (
                                        <img
                                            className="project-navbar-photos"
                                            src={`http://localhost:1337${project.attributes.projectCoverPhoto.data.attributes.url}`}
                                            alt=""
                                        />
                                    )}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No projects found</p>
                )}

                {roles.length > 0 ? (
                    roles.map(
                        (role) =>
                            role.attributes.role === "Admin" && (
                                <button
                                    className="add-project-btn"
                                    onClick={() => setShowModal(true)}
                                >
                                    Proje Ekle
                                </button>
                            )
                    )
                ) : (
                    <p>No roles found</p>
                )}
            </div>

            {showModal && (
                <div className="add-new-project-modal">
                    <div className="add-new-project-modal-content">
                        <span
                            className="new-project-modal-close"
                            onClick={() => setShowModal(false)}
                        >
                            X
                        </span>
                        <h2 className="new-project-adding-header">Yeni Proje Ekle</h2>
                        <input
                            className="project-name-input"
                            type="text"
                            name="projectName"
                            placeholder="Proje Adı"
                            value={newProject.projectName}
                            onChange={handleInputChange}
                        />
                        <input
                            className="project-cover-photo-input"
                            type="file"
                            name="projectCoverPhoto"
                            onChange={handleFileChange}
                        />
                        <div className="adding-modal-buttons-row">
                            <button
                                className="adding-modal-button-create"
                                onClick={handleSubmit}
                            >
                                Oluştur
                            </button>
                            <button
                                className="adding-modal-button-abort"
                                onClick={() => setShowModal(false)}
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectsMainPage;
