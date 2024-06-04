import { Link } from "react-router-dom";

function ProjectsMainPage() {
    const projects = [
        {
            id: 1,
            name: "Bişey Konutları",
            description: "Description1",
        },
        {
            id: 2,
            name: "Project2",
            description: "Description2",
        },
        {
            id: 3,
            name: "Project3",
            description: "Description3",
        },
        {
            id: 4,
            name: "Project4",
            description: "Description4",
        },
    ];

    return (
        <div>
            {projects.map((project) => (
                <div className="project-card" key={project.id}>
                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </div>
            ))}
        </div>
    );
}

export default ProjectsMainPage;