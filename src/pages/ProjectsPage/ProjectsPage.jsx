import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectsPage.scss";

import ProjectInside from "../../components/ProjectInside/ProjectInside";
import Navigation from "../../components/Navigation/Navigation";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import ProjectContent from "../../components/ProjectContent/ProjectContent";
import ProjectDetails from "../../components/ProjectDetails/ProjectDetails";

function ProjectsPage() {
    const [companyProjects, setCompanyProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(companyProjects[0]);
    const [currentTab, setCurrentTab] = useState('allprojects');
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeFolder, setActiveFolder] = useState("");

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

    return (
        <div className="projects-page">
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
