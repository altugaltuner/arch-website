import { useEffect, useState } from "react";
import "../ProjectBasedRevisions/ProjectBasedRevisions.scss";
import axios from 'axios';

function ProjectBasedRevisions({ clickedProject }) {
    const [projectBasedRevisions, setProjectBasedRevisions] = useState([]);
    const [activeProjectTitle, setActiveProjectTitle] = useState(null);

    useEffect(() => {
        if (clickedProject) {
            setActiveProjectTitle(clickedProject.attributes.projectName);
        } else {
            console.warn('clickedProject prop is null or undefined');
        }
    }, [clickedProject]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/project-revises?populate=*');
                setProjectBasedRevisions(response.data.data);
            } catch (error) {
                console.error('Revizeler alınırken hata oluştu:', error);
            }
        };

        fetchData();
    }, []);

    const getCommentText = (comment) => {
        return comment.map((paragraph, index) => (
            <p className="revision-paragraph" key={paragraph.id}>
                {paragraph.children.map((child, childIndex) => (
                    <span className="revision-comment" key={child.id}>{child.text}</span>
                ))}
            </p>
        ));
    };

    return (
        <div className="projects-based-revisions">
            <h1 className="projects-revisions-header">Proje Revizelerim</h1>
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
