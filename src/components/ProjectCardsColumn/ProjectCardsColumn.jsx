import React, { useState, useEffect } from 'react';
import editPencil from "../../assets/icons/edit-pencil.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import PasswordModal from "./PasswordModal";
import "./ProjectCardsColumn.scss";
import { useAuth } from "../../components/AuthProvider";
import axios from 'axios';

function ProjectCardsColumn({ companyProjects, deleteModalOpen, setShowModal, editModalOpen }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(companyProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { user } = useAuth();
    const [userInvolvedProjects, setUserInvolvedProjects] = useState([]);

    const userRole = user && user.access ? user.access.role : null;

    useEffect(() => {
        setUserInvolvedProjects(user.projects);
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
                await axios.put(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/users/${user.id}`, {
                    projects: updatedProjects.map(project => project.id)
                });
                window.location.href = `/projects/${selectedProject.id}`;
            } catch (error) {
            }
        } else {
            alert('Yanlış şifre');
            setIsModalOpen(true);
        }
    };

    const handleProjectClick = (project) => {
        if (isModalOpen) return;

        const userProjects = user.projects.map(p => p.projectName);
        if (userProjects.includes(project.attributes.projectName)) {
            window.location.href = `/projects/${project.id}`;
        } else {
            setSelectedProject(project);
            setIsModalOpen(true);
        }
    };

    return (
        <div className="project-cards-column">
            <div className="project-cards-header-and-searchbar">
                <h1 className="div-big-header">Projeler</h1>
                <input
                    onChange={searchProjects}
                    value={searchTerm}
                    className="search-bar-of-projects"
                    type="text"
                    placeholder="Proje Ara"
                    autoComplete="off"
                />
            </div>
            <div className="projects-cards-main-row">
                {userRole === "Admin" && (
                    <button
                        className="add-project-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Proje Ekle
                    </button>

                )}
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <div className="project-cards" key={project.id}>
                            {userRole === "Admin" && (
                                <>
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
                                </>
                            )}
                            <div className="project-card" onClick={() => handleProjectClick(project)}>
                                <p className="project-card-name">
                                    {project.attributes.projectName}
                                </p>
                                {project?.attributes?.projectCoverPhoto && project?.attributes?.projectCoverPhoto?.data && (
                                    <img
                                        className="project-navbar-photos"
                                        src={project?.attributes?.projectCoverPhoto?.data?.attributes?.formats?.thumbnail?.url ?? project?.attributes?.projectCoverPhoto?.data?.attributes?.url}
                                        alt="Project Cover"
                                    />
                                )}

                            </div>
                        </div>
                    ))
                ) : (
                    <p>Henüz Proje Bulunmamaktadır.</p>
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
