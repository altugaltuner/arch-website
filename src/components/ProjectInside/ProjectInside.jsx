import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ProjectInside.scss";

function ProjectInside() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects');
                console.log(response.data); // Yanıtı kontrol etmek için konsola yazdırın
                setProjects(response.data.data); // API'nin döndürdüğü veriyi kontrol edin ve uygun şekilde kaydedin
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
                        <li key={project.id} className="project-item">
                            <img className="project-navbar-photos" src={project.projectCoverPhoto} alt={project.projectName} />
                            {project.attributes.projectName}
                        </li>
                    )) : <li>Yükleniyor</li>}
                </ul>
            </div>
        </div>
    );
}

export default ProjectInside;