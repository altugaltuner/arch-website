import { useEffect, useState } from "react";
import "../ProjectBasedRevisions/ProjectBasedRevisions.scss";
import axios from 'axios';

function ProjectBasedRevisions({ clickedProject }) {
    const [projectBasedRevisions, setProjectBasedRevisions] = useState([]);
    const [activeProjectTitle, setActiveProjectTitle] = useState(null);

    useEffect(() => {
        if (clickedProject) {
            setActiveProjectTitle(clickedProject.attributes.projectName);
            console.log("Active Project Title Updated:", clickedProject.attributes.projectName); // Debug için eklendi
        } else {
            console.log("No Project Selected"); // Debug için eklendi
        }
    }, [clickedProject]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/project-revises?populate=*');
                console.log("Fetched Data:", response.data.data); // Debug için eklendi
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

    console.log("Project Based Revisions:", projectBasedRevisions); // Debug için eklendi
    console.log("Active Project Title:", activeProjectTitle); // Debug için eklendi
    console.log("Clicked Project:", clickedProject); // Debug için eklendi

    return (
        <div className="projects-based-revisions">
            <h1 className="projects-revisions-header">Proje Revizeleri</h1>
            <div className="project-revisions">
                {projectBasedRevisions.filter(projectRevision => {
                    console.log("Checking project:", projectRevision.attributes.project.data.attributes.projectName); // Debug için eklendi
                    return projectRevision.attributes.project.data.attributes.projectName === "Yeşil Vadi Konutları"
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
