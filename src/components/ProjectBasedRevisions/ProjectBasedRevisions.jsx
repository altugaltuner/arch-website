import { useEffect, useState } from "react";
import "../ProjectBasedRevisions/ProjectBasedRevisions.scss";
import axios from 'axios';

const CACHE_DURATION = 15 * 60 * 1000;

function ProjectBasedRevisions({ clickedProject }) {
    const [projectBasedRevisions, setProjectBasedRevisions] = useState([]);
    const [activeProjectTitle, setActiveProjectTitle] = useState(null);

    useEffect(() => {
        if (clickedProject) {
            setActiveProjectTitle(clickedProject.attributes.projectName);
        } else {
        }
    }, [clickedProject]);

    useEffect(() => {
        const fetchData = async () => {
            const cachedProjectBasedRevisions = localStorage.getItem(`projectBasedRevisions`);
            const cachedTimestampProjectBasedRevisions = localStorage.getItem(`projectBasedRevisions_timestamp`);

            if (cachedProjectBasedRevisions && cachedTimestampProjectBasedRevisions) {
                const age = Date.now() - parseInt(cachedTimestampProjectBasedRevisions, 10);
                if (age < CACHE_DURATION) {
                    setProjectBasedRevisions(JSON.parse(cachedProjectBasedRevisions));
                    return;
                }
            }
            try {
                const response = await axios.get('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/project-revises?populate=*');
                setProjectBasedRevisions(response.data.data);
                localStorage.setItem(`projectBasedRevisions`, JSON.stringify(response.data.data));
                localStorage.setItem(`projectBasedRevisions_timestamp`, Date.now().toString());
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    const getCommentText = (comment) => {
        return comment.map((paragraph, index) => (
            <p className="revision-paragraph" key={index}>
                {paragraph.children.map((child, childIndex) => (
                    <span className="revision-comment" key={childIndex}>{child.text}</span>
                ))}
            </p>
        ));
    };

    return (
        <div className="projects-based-revisions">
            <h1 className="projects-revisions-header">Proje Revizeleri</h1>
            <div className="project-revisions">
                {projectBasedRevisions.filter(projectRevision => {
                    return projectRevision.attributes.project.data.attributes.projectName === "Seçili Proje Yok"
                }).map((projectRevision) => (
                    <div key={projectRevision.id} className="project-revision">
                        <h2 className="revision-project-name">{projectRevision.attributes.project.data.attributes.projectName}</h2>
                        {getCommentText(projectRevision.attributes.comment)}
                        <p>{projectRevision.attributes.revisionDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectBasedRevisions;
