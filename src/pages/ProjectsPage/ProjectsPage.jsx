import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import "./ProjectsPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import ProjectSection from "../../components/ProjectSection/ProjectSection";
import ProjectTeam from "../../components/ProjectTeam/ProjectTeam";
import ProjectComments from "../../components/ProjectComments/ProjectComments";
import ProjectHistory from "../../components/ProjectHistory/ProjectHistory";
import ProjectProcess from "../../components/ProjectProcess/ProjectProcess";

const CACHE_DURATION = 15 * 60 * 1000; // 15 dakika

function ProjectsPage() {
    const [roles, setRoles] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newHistoryEntry, setNewHistoryEntry] = useState(null);

    const { projectId } = useParams();
    const location = useLocation();

    const idToFetch = location.state?.projectId || projectId;

    async function getRoles() {
        const cachedRole = localStorage.getItem(`roles`);
        const cachedTimestampRole = localStorage.getItem(`roles_timestamp`);

        if (cachedRole && cachedTimestampRole) {
            const age = Date.now() - parseInt(cachedTimestampRole, 10);
            if (age < CACHE_DURATION) {
                console.log('Veriler localStorage\'dan yükleniyor');
                setRoles(JSON.parse(cachedRole));
                return;
            }
        }

        try {
            const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/accesses');
            setRoles(response.data.data);
            localStorage.setItem(`roles`, JSON.stringify(data));
            localStorage.setItem(`roles_timestamp`, Date.now().toString());
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

    const getProjectDetails = async () => {
        const cachedProject = localStorage.getItem(`project_${idToFetch}`);
        const cachedTimestamp = localStorage.getItem(`project_${idToFetch}_timestamp`);

        if (cachedProject && cachedTimestamp) {
            const age = Date.now() - parseInt(cachedTimestamp, 10);
            if (age < CACHE_DURATION) {
                console.log('Veriler localStorage\'dan yükleniyor');
                setCurrentProject(JSON.parse(cachedProject));
                return;
            }
        }

        const endpoint = `https://bold-animal-facf707bd9.strapiapp.com/api/projects/${idToFetch}?populate=*`;
        try {
            console.log('Veriler sunucudan yükleniyor');
            setLoading(true);
            const { data } = await axios.get(endpoint);
            setCurrentProject(data);
            localStorage.setItem(`project_${idToFetch}`, JSON.stringify(data));
            localStorage.setItem(`project_${idToFetch}_timestamp`, Date.now().toString());
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
        return <div>Yükleniyor...</div>;
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
                        {currentProject && <ProjectSection clickedProject={currentProject.data} setNewHistoryEntry={setNewHistoryEntry} />}
                        {currentProject && <ProjectTeam clickedProject={currentProject.data} updateProject={getProjectDetails} />}
                    </div>
                    <div className="inner-project-row">
                        {currentProject && <ProjectComments clickedProject={currentProject.data} />}
                        {currentProject && <ProjectHistory clickedProject={currentProject.data} newHistoryEntry={newHistoryEntry} />}
                        {currentProject && <ProjectProcess clickedProject={currentProject.data} roles={roles} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectsPage;
