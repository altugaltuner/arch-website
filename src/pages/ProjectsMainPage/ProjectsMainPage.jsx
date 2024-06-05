import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProjectsMainPage() {

    const [companyProjects, setCompanyProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects');
                setCompanyProjects(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {companyProjects.map((project) => (
                <div className="project-card" key={project.id}>
                    <Link to={`/projects/${project.id}`}>{project.attributes.projectName}</Link>
                </div>
            ))}

            <div className="projects-main-page">
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
        </div>
    );
}

export default ProjectsMainPage;