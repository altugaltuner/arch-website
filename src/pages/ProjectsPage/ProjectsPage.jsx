import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectsPage.scss";

import ProjectSection from "../../components/ProjectSection/ProjectSection";
import ProjectTeam from "../../components/ProjectTeam/ProjectTeam";
import ProjectInside from "../../components/ProjectInside/ProjectInside";
import Navigation from "../../components/Navigation/Navigation";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";

function ProjectsPage() {
    const [companyProjects, setCompanyProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate[projectAllFiles][populate]=*');
                setCompanyProjects(response.data.data);
                console.log("Fetched companyProjects:", response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    const { tabName } = useParams();
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        console.log("Item clicked:", item);
        setSelectedItem(item);
    };

    const handleTabChange = () => {
        setSelectedItem(null);
    };

    const activeComponents = {
        allprojects: <ProjectSection onItemClick={handleItemClick} />,
        team: <ProjectTeam onItemClick={handleItemClick} />,
    };

    console.log("Selected item:", selectedItem);
    console.log("Tab name:", tabName);

    return (
        <div className="projects-page">
            <Navigation />
            <div className="inner-project-page">
                <ProjectInside />
                <div className="inner-project-column">
                    <ProjectHeader onTabChange={handleTabChange} />
                    {selectedItem ? (
                        <div className="new-section">
                            <h3 className="new-section-header">{selectedItem.attributes.projectName}</h3>
                            <div className="company-project-files-main">
                                {selectedItem.attributes.projectAllFiles && selectedItem.attributes.projectAllFiles.data ? (
                                    Object.entries(selectedItem.attributes.projectAllFiles).map(([key, value]) => (
                                        value.data ? (
                                            <div key={key}>
                                                <h4>{key}</h4>
                                                {value.data.map(file => (
                                                    <div className="company-project-files" key={file.id}>
                                                        <h4>{file.attributes.name}</h4>
                                                        <img className="extension-logo" src={file.attributes.url} alt={file.attributes.name} />
                                                        <p>Format: {file.attributes.ext}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p key={key}>{key} - No files available</p>
                                        )
                                    ))
                                ) : (
                                    <p>No files available</p>
                                )}
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
