import React from 'react';
import { Link } from "react-router-dom";
import editPencil from "../../assets/icons/edit-pencil.png";
import deleteIcon from "../../assets/icons/delete-icon.png";

function ProjectCardsColumn({ companyProjects, roles, deleteModalOpen, setShowModal }) {
    return (
        <div className="project-cards-column">
            <h1 className="title-for-projects">Projeler</h1>
            <div className="projects-cards-main-row">
                {companyProjects.length > 0 ? (
                    companyProjects.map((project) => (
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
        </div>
    );
}

export default ProjectCardsColumn;
