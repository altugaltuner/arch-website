import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ProjectInside.scss";

function ProjectInside({ onProjectClick }) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/projects?populate=projectCoverPhoto');

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
                <h2 className="sidebar-title">Aktif Projeler</h2>
                <ul className="projects-list">
                    {projects.length > 0 ? projects.map(project => (
                        <li key={project.id} className="project-item" onClick={() => onProjectClick(project)}>
                            <img className="project-navbar-photos" src={`https://bold-animal-facf707bd9.strapiapp.com${project.attributes.projectCoverPhoto.data.attributes.url}`} alt="project-photo" />
                            {project.attributes.projectName}
                        </li>
                    )) : <li>Yükleniyor</li>}
                </ul>
            </div>
        </div>
    );
}

export default ProjectInside;
