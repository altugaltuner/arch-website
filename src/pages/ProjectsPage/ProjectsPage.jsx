import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./ProjectsPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import ProjectSection from "../../components/ProjectSection/ProjectSection";
import ProjectTeam from "../../components/ProjectTeam/ProjectTeam";
import ProjectComments from "../../components/ProjectComments/ProjectComments";
import ProjectMetrics from "../../components/ProjectMetrics/ProjectMetrics";

function ProjectsPage() {
    const [roles, setRoles] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { projectId } = useParams();
    const location = useLocation();

    const idToFetch = location.state?.projectId || projectId;

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

    const getProjectDetails = async () => {
        const endpoint = `http://localhost:1337/api/projects/${idToFetch}?populate=*`;
        try {
            setLoading(true);
            const { data } = await axios.get(endpoint);
            setCurrentProject(data);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
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
                    {currentProject && <ProjectHeader clickedProject={currentProject.data} />}
                    <div className="inner-project-row">
                        {currentProject && <ProjectSection clickedProject={currentProject.data} />}
                        {currentProject && <ProjectTeam clickedProject={currentProject.data} updateProject={getProjectDetails} />}
                    </div>
                    <div className="inner-project-row">
                        {currentProject && <ProjectComments clickedProject={currentProject.data} />}
                        {currentProject && <ProjectMetrics clickedProject={currentProject.data} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectsPage;
