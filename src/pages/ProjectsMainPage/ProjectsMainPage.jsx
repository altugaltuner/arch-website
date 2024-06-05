import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectsMainPage.scss";
import Navigation from "../../components/Navigation/Navigation";


function ProjectsMainPage() {

    const [companyProjects, setCompanyProjects] = useState([]);
    const [roles, setRoles] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate=projectCoverPhoto');
                setCompanyProjects(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="projects-main-page">
            <Navigation />
            <div className="projects-cards-main-row">
                {companyProjects.map((project) => (
                    <div className="project-cards" key={project.id}>
                        <Link
                            className="project-card"
                            to={{
                                pathname: `/projects/${project.id}`,
                                state: {
                                    projectId: project.id,
                                    projectName: project.attributes.projectName, // Pass projectName correctly here
                                }
                            }}
                        >
                            <p className="project-card-name">{project.attributes.projectName}</p>
                            <img className="project-navbar-photos" src={`http://localhost:1337${project.attributes.projectCoverPhoto.data.attributes.url}`} alt="project-photo" />
                        </Link>

                    </div>
                ))}
                {roles.map(role => {
                    if (role.attributes.role === "Admin") {
                        return (
                            <button className="add-project-btn">
                                proje ekle
                            </button>
                        )
                    }
                })}
            </div>
        </div>
    );
}

export default ProjectsMainPage;
