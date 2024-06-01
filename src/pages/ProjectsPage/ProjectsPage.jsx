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
    const [activeFolder, setActiveFolder] = useState("");

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
        console.log("Selected Item:", item); // Debug için eklendi
        if (item && item.attributes) {
            setActiveFolder(item.attributes.projectFolderName);
            console.log("Active Project Name:", item.attributes.projectFolderName); // Debug için eklendi
        }
    };

    const handleProjectClick = (project) => {
        setSelectedProject(project);
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
                                <h2 className="new-section-header">{selectedItem.attributes && selectedItem.attributes.projectName ? selectedItem.attributes.projectName : "No Project Name"}</h2>
                                <SelectedItemSection activeProjectTitle={activeFolder} companyProjects={companyProjects} />
                            </div>
                            <ProjectBasedRevisions clickedProject={selectedProject} />
                            <button onClick={() => setSelectedItem(null)}>Back</button>
                        </div>
                    ) : (
                        activeComponents[currentTab] ||
                        <div className="file-inside-row">
                            <ProjectSection onItemClick={handleItemClick} />
                            <ProjectBasedRevisions clickedProject={selectedProject} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectsPage;
