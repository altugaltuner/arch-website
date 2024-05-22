import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectsPage.scss";

import ProjectSection from "../../components/ProjectSection/ProjectSection";
import ProjectTeam from "../../components/ProjectTeam/ProjectTeam";
import ProjectInside from "../../components/ProjectInside/ProjectInside";
import Navigation from "../../components/Navigation/Navigation";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import companyProjects from "../../database/companyProjects.js/yesilVadiProject";

function ProjectsPage() {
    const { tabName } = useParams();
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        console.log("Item clicked:", item); // Debug log
        setSelectedItem(item);
    };

    const handleTabChange = () => {
        setSelectedItem(null);
    };

    const activeComponents = {
        allprojects: <ProjectSection onItemClick={handleItemClick} />,
        team: <ProjectTeam onItemClick={handleItemClick} />,
    };

    console.log("Selected item:", selectedItem); // Debug log
    console.log("Tab name:", tabName); // Debug log

    return (
        <div className="projects-page">
            <Navigation />
            <div className="inner-project-page">
                <ProjectInside />
                <div className="inner-project-column">
                    <ProjectHeader onTabChange={handleTabChange} />
                    {selectedItem ? (
                        <div className="new-section">
                            <h3 className="new-section-header">{selectedItem.attributes.projectFolderName}</h3>
                            <div className="company-project-files-main">
                                {companyProjects.map((item) => (
                                    <div className="company-project-files" key={item.id}>
                                        <h4>{item.fileTitle}</h4>
                                        <p>{item.modificationDate}</p>
                                        <img className="extension-logo" src={item.imageSrc} alt={item.fileTitle} />
                                        <p>{item.extension}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        activeComponents[tabName] || <ProjectSection onItemClick={handleItemClick} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectsPage;
