import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ProjectInside.scss";

function ProjectInside({ onProjectClick }) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate=projectCoverPhoto');
                console.log(response.data);
                setProjects(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="project-inside-main">
            <div className="projects-sidebar">
                <h2 className="sidebar-title">Projeler</h2>
                <ul className="projects-list">
                    {projects.length > 0 ? projects.map(project => (
                        <li key={project.id} className="project-item" onClick={() => onProjectClick(project)}>
                            <img className="project-navbar-photos" src={`http://localhost:1337${project.attributes.projectCoverPhoto.data.attributes.url}`} alt="project-photo" />
                            {project.attributes.projectName}
                        </li>
                    )) : <li>Yükleniyor</li>}
                </ul>
            </div>
        </div>
    );
}

export default ProjectInside;
