import React, { useState, useEffect } from 'react';
import editPencil from "../../assets/icons/edit-pencil.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import PasswordModal from "./PasswordModal";
import "./ProjectCardsColumn.scss";
import { useAuth } from "../../components/AuthProvider";
import axios from 'axios';

function ProjectCardsColumn({ companyProjects, roles, deleteModalOpen, setShowModal, editModalOpen }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(companyProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { user } = useAuth();
    const [userInvolvedProjects, setUserInvolvedProjects] = useState([]);

    useEffect(() => {
        setUserInvolvedProjects(user.projects);
        console.log("userInvolvedProjects:", userInvolvedProjects);
    }, [user.projects]);

    useEffect(() => {
        const results = companyProjects.filter(project =>
            project.attributes.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(results);
    }, [searchTerm, companyProjects]);

    const searchProjects = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    const handleModalConfirm = async (password) => {
        if (selectedProject && selectedProject.attributes.projectPassword === password) {
            try {
                const updatedProjects = [...userInvolvedProjects, selectedProject];
                setUserInvolvedProjects(updatedProjects);
                // Kullanıcının projelerini güncelle
                await axios.put(`http://localhost:1337/api/users/${user.id}`, {
                    projects: updatedProjects.map(project => project.id)
                });
                window.location.href = `/projects/${selectedProject.id}`;
            } catch (error) {
                console.error('Proje eklenirken bir hata oluştu:', error);
            }
        } else {
            alert('Yanlış şifre');
            setIsModalOpen(true);
        }
    };

    const handleProjectClick = (project) => {
        const userProjects = user.projects.map(p => p.projectName);
        if (userProjects.includes(project.attributes.projectName)) {
            window.location.href = `/projects/${project.id}`;
        } else {
            setSelectedProject(project);
            setIsModalOpen(true);
        }
    };

    console.log("filteredProjects:", filteredProjects);

    return (
        <div className="project-cards-column">
            <div className="project-cards-header-and-searchbar">
                <h1 className="title-for-projects">Projeler</h1>
                <input
                    onChange={searchProjects}
                    value={searchTerm}
                    className="search-bar-of-projects"
                    type="text"
                    placeholder="Proje Ara"
                />
            </div>
            <div className="projects-cards-main-row">
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
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <div className="project-cards" key={project.id}>
                            <img
                                className="project-card-delete-btn"
                                src={deleteIcon}
                                alt=""
                                onClick={() => deleteModalOpen(project.id)}
                            />
                            <img
                                className="project-card-edit-btn"
                                src={editPencil}
                                alt=""
                                onClick={() => editModalOpen(project.id)}
                            />
                            <div className="project-card" onClick={() => handleProjectClick(project)}>
                                <p className="project-card-name">
                                    {project.attributes.projectName}
                                </p>
                                {project.attributes.projectCoverPhoto &&
                                    project.attributes.projectCoverPhoto.data && (
                                        <img
                                            className="project-navbar-photos"
                                            src={`http://localhost:1337${project.attributes.projectCoverPhoto.data.attributes.formats.thumbnail.url}`}
                                            alt="Project Cover"
                                            onError={(e) => { console.log("Image Error:", e); }}
                                        />
                                    )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No projects found</p>
                )}
            </div>
            <PasswordModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
                projectName={selectedProject ? selectedProject.attributes.projectName : ''}
            />
        </div>
    );
}

export default ProjectCardsColumn;
