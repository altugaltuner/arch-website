import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectsPage.scss";

import ProjectInside from "../../components/ProjectInside/ProjectInside";
import Navigation from "../../components/Navigation/Navigation";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import ProjectContent from "../../components/ProjectContent/ProjectContent";
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails";
import { getAccessRoles } from "../../api/access";

function ProjectsPage() {
    const [companyProjects, setCompanyProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(companyProjects[0]);
    const [currentTab, setCurrentTab] = useState('allprojects');
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeFolder, setActiveFolder] = useState("");

    const [roles, setRoles] = useState([]);

    async function getRoles() {
        try {
            const response = await axios.get('http://localhost:1337/api/accesses');
            setRoles(response.data.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

    console.log(roles);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate[projectAllFiles][populate]=*');
                setCompanyProjects(response.data.data);
                setSelectedProject(response.data.data[0]);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    useParams();

    const handleItemClick = (item) => {
        setSelectedItem(item);
        if (item && item.attributes) {
            setActiveFolder(item.attributes.projectFolderName);
        }
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleTabChange = (tab) => {
        setCurrentTab(tab);
        setSelectedItem(null);
    };

    //ilave

    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function getProjectDetails() {
        const { projectId } = useParams();
        const endpoint = `http://localhost:1337/api/projects/${projectId}`;
        try {
            setLoading(true);
            const { data } = axios.get(endpoint);
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
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div className="projects-page">
            {roles.map(role => {
                if (role.attributes.role === "Admin") {
                    return (

                        <button>
                            proje ekle
                        </button>
                    )
                }
            }
            )}
            <Navigation />
            <div className="inner-project-page">
                <ProjectInside onProjectClick={handleProjectClick} />
                <div className="inner-project-column">
                    <ProjectHeader clickedProject={selectedProject} onTabChange={handleTabChange} />
                    {selectedItem ? (
                        <ProjectDetails
                            selectedItem={selectedItem}
                            activeFolder={activeFolder}
                            companyProjects={companyProjects}
                            selectedProject={selectedProject}
                            onBack={() => setSelectedItem(null)}
                        />
                    ) : (
                        <ProjectContent currentTab={currentTab} handleItemClick={handleItemClick} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectsPage;
