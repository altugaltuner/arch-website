import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import "./ProjectsMainPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import AddNewProjectModal from "../../components/AddNewProjectModal/AddNewProjectModal";
import ProjectCardsColumn from "../../components/ProjectCardsColumn/ProjectCardsColumn";
import EditProjectModal from "../../components/EditProjectModal/EditProjectModal";

const CACHE_DURATION = 15 * 60 * 1000;

function fetchProjects(usersCompanyId) {
    const cachedProject = localStorage.getItem(`projects_${usersCompanyId}`);
    const cachedTimestamp = localStorage.getItem(`projects_${usersCompanyId}_timestamp`);

    if (cachedProject && cachedTimestamp) {
        const age = Date.now() - parseInt(cachedTimestamp, 10);
        if (age < CACHE_DURATION) {
            return Promise.resolve(JSON.parse(cachedProject));
        }
    }

    return axios
        .get(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/companies/${usersCompanyId}?populate[projects][populate]=*`)
        .then((response) => {
            const companyData = response.data.data;
            const filteredProjects = companyData.attributes.projects.data.filter(
                (project) => project.attributes.company.data.id === usersCompanyId
            );

            // Save to local storage
            localStorage.setItem(`projects_${usersCompanyId}`, JSON.stringify(filteredProjects));
            localStorage.setItem(`projects_${usersCompanyId}_timestamp`, Date.now().toString());

            return filteredProjects;
        });
}

function ProjectsMainPage() {
    const { user } = useAuth();
    const usersCompanyId = user?.company?.id;
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [newProject, setNewProject] = useState({
        projectName: "",
        projectCoverPhoto: null,
        projectPassword: "",
    });
    const [editProject, setEditProject] = useState({
        projectName: "",
        projectCoverPhoto: null,
        projectPassword: "",
    });

    const { data: companyProjects, isLoading, isError } = useQuery(
        ['projects', usersCompanyId],
        () => fetchProjects(usersCompanyId),
        {
            enabled: !!usersCompanyId, // Only run the query if usersCompanyId is available
            staleTime: CACHE_DURATION, // Cache duration
        }
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading projects.</div>;
    }

    // Your existing methods like handleInputChange, handleSubmit, etc., remain unchanged

    return (
        <div className="projects-main-page">
            <Navigation />
            <ProjectCardsColumn
                companyProjects={companyProjects}
                roles={roles}
                deleteModalOpen={deleteModalOpen}
                setShowModal={setShowModal}
                editModalOpen={editModalOpen}
            />
            <AddNewProjectModal
                show={showModal}
                onClose={() => setShowModal(false)}
                newProject={newProject}
                handleInputChange={handleInputChange}
                handleInputPasswordChange={handleInputPasswordChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
            />
            <DeleteConfirmationModal
                showDeleteModal={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />
            <EditProjectModal
                showEditModal={showEditModal}
                onClose={() => setShowEditModal(false)}
                projectToEdit={editProject}
                handleInputChange={handleInputChange}
                handleInputPasswordChange={handleInputPasswordChange}
                handleFileChange={handleFileChange}
                handleEditSubmit={handleEditSubmit}
            />
        </div>
    );
}

export default ProjectsMainPage;
