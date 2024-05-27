import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectsPage.scss";

import ProjectSection from "../../components/ProjectSection/ProjectSection";
import ProjectTeam from "../../components/ProjectTeam/ProjectTeam";
import ProjectInside from "../../components/ProjectInside/ProjectInside";
import Navigation from "../../components/Navigation/Navigation";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import SelectedItemSection from "../../components/SelectedItemSection/SelectedItemSection";
import ProjectBasedRevisions from "../../components/ProjectBasedRevisions/ProjectBasedRevisions";

function ProjectsPage() {
    const [companyProjects, setCompanyProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentTab, setCurrentTab] = useState('allprojects');
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeProjectName, setActiveProjectName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate[projectAllFiles][populate]=*');
                setCompanyProjects(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    useParams();

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setActiveProjectName(item.attributes.projectFolderName);
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
        console.log("Selected Project:", project); // Debug için eklendi
        console.log("Selected Project Name ben yazdım:", project.attributes.projectName); // Debug için eklendi
    };


    const handleTabChange = (tab) => {
        setCurrentTab(tab);
        setSelectedItem(null);
    };

    const activeComponents = {
        allprojects: <ProjectSection onItemClick={handleItemClick} />,
        team: <ProjectTeam onItemClick={handleItemClick} />,
    };

    return (
        <div className="projects-page">
            <Navigation />
            <div className="inner-project-page">
                <ProjectInside onProjectClick={handleProjectClick} />
                <div className="inner-project-column">
                    <ProjectHeader clickedProject={selectedProject} onTabChange={handleTabChange} />
                    {selectedItem ? (
                        <div className="new-section">
                            <div className="selected-folder-items">
                                <h2 className="new-section-header">{selectedItem.attributes.projectFolderName}</h2>
                                <SelectedItemSection selectedProject={selectedProject} companyProjects={companyProjects} />
                            </div>
                            <ProjectBasedRevisions clickedProject={selectedProject ? selectedProject.attributes.projectFolderName : ""} />
                        </div>
                    ) : (
                        activeComponents[currentTab] ||
                        <div className="file-inside-row"> <ProjectSection onItemClick={(folder) => handleItemClick(folder)} />
                            <ProjectBasedRevisions clickedProject={selectedProject ? selectedProject.attributes.projectFolderName : ""} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectsPage;
