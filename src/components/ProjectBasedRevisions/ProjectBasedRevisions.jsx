import { useEffect, useState } from "react";
import "../ProjectBasedRevisions/ProjectBasedRevisions.scss";
import axios from 'axios';

function ProjectBasedRevisions() {
    const [ProjectBasedRevisions, setProjectBasedRevisions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/project-revises?populate=*');
                console.log(response.data);
                setProjectBasedRevisions(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
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
                {ProjectBasedRevisions.map((projectRevision) => (
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
