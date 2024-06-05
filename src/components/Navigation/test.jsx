import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./ProjectsPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import ProjectContent from "../../components/ProjectContent/ProjectContent";

function ProjectsPage() {
    const [roles, setRoles] = useState([]);

    // Additional states for project details
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { projectId } = useParams();
    const location = useLocation();

    // Use the projectId and projectName from the location state if available
    const idToFetch = location.state?.projectId || projectId;
    const projectName = location.state?.projectName || "projecttyName"; // Capture projectName from location state
    console.log("projectName", location.state?.projectName);

    async function getRoles() {
        try {
            const response = await axios.get('http://localhost:1337/api/accesses');
            setRoles(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

    console.log(roles);

    async function getProjectDetails() {
        const endpoint = `http://localhost:1337/api/projects/${idToFetch}`;
        try {
            setLoading(true);
            const { data } = await axios.get(endpoint);
            setCurrentProject(data);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
            console.log("currentProject isss", currentProject);
        }
    }

    useEffect(() => {
        getProjectDetails();
    }, [idToFetch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="projects-page">
            <Navigation />
            <div className="inner-project-page">
                <div className="inner-project-column">
                    {currentProject && <ProjectHeader clickedProject={currentProject.data} />} {/* Pass project data correctly here */}
                    {currentProject && <ProjectContent project={currentProject} />}
                </div>
            </div>
        </div>
    );
}

export default ProjectsPage;
