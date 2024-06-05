import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectsMainPage.scss";
import ProjectInside from "../../components/ProjectInside/ProjectInside";
import Navigation from "../../components/Navigation/Navigation";
import ProjectHeader from "../../components/ProjectHeader/ProjectHeader";
import ProjectContent from "../../components/ProjectContent/ProjectContent";

function ProjectsMainPage() {

    const [companyProjects, setCompanyProjects] = useState([]);
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
        <div>
            <div className="projects-main-page">
                <Navigation />
                {companyProjects.map((project) => (
                    <div className="project-cards" key={project.id}>
                        <div className="project-card">
                            <Link to={`/projects/${project.id}`}>
                                <img className="project-navbar-photos" src={`http://localhost:1337${project.attributes.projectCoverPhoto.data.attributes.url}`} alt="project-photo" />
                                {project.attributes.projectName}
                            </Link>
                        </div>

                    </div>
                ))}
            </div>
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
        </div>
    );
}

export default ProjectsMainPage;