import React, { useState, useEffect } from 'react';
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
            <p key={index}>
                {paragraph.children.map((child, childIndex) => (
                    <span key={childIndex}>{child.text}</span>
                ))}
            </p>
        ));
    };

    return (
        <div className="projects-based-revisions">
            <h1>Proje Revizeleri</h1>
            <div className="project-revisions">
                {ProjectBasedRevisions.map((projectRevision) => (
                    <div key={projectRevision.id} className="project-revision">
                        <h2>{projectRevision.attributes.revisionName}</h2>
                        {getCommentText(projectRevision.attributes.comment)}
                        <p>{projectRevision.attributes.revisionDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectBasedRevisions;
