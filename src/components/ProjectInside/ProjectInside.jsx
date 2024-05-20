import "./ProjectInside.scss";

import projectList from "../../database/companyProjects.js/projectList";

function ProjectInside() {

    return (
        <div className="project-inside-main">
            <div className="projects-sidebar">
                <h2 className="sidebar-title">Projeler</h2>
                <ul className="projects-list">
                    {projectList.map((project) => (
                        <li key={project.name} className="project-item">
                            <img className="project-navbar-photos" src={project.photo} alt={project.name} />
                            <p className="project-navbar-name">{project.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProjectInside;