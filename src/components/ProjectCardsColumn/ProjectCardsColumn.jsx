import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import editPencil from "../../assets/icons/edit-pencil.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import "./ProjectCardsColumn.scss";

function ProjectCardsColumn({ companyProjects, roles, deleteModalOpen, setShowModal, editModalOpen }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(companyProjects);

    useEffect(() => {
        const results = companyProjects.filter(project =>
            project.attributes.projectName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProjects(results);
    }, [searchTerm, companyProjects]);

    const searchProjects = (event) => {
        setSearchTerm(event.target.value);
    };

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
                            <Link className="project-card" to={`/projects/${project.id}`}>
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
            </div>
        </div>
    );
}

export default ProjectCardsColumn;
