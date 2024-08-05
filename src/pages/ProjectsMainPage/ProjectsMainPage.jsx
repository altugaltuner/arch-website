import { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectsMainPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import AddNewProjectModal from "../../components/AddNewProjectModal/AddNewProjectModal";
import ProjectCardsColumn from "../../components/ProjectCardsColumn/ProjectCardsColumn";
import EditProjectModal from "../../components/EditProjectModal/EditProjectModal";

const CACHE_DURATION = 15 * 60 * 1000; // 15 dakika

function ProjectsMainPage() {
  const { user } = useAuth();
  const usersCompanyId = user?.company?.id;

  const [companyProjects, setCompanyProjects] = useState([]);
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

  async function getRoles() {
    const cachedRole = localStorage.getItem(`roles`);
    const cachedTimestampRole = localStorage.getItem(`roles_timestamp`);

    if (cachedRole && cachedTimestampRole) {
      const age = Date.now() - parseInt(cachedTimestampRole, 10);
      if (age < CACHE_DURATION) {
        console.log('Veriler localStorage\'dan yükleniyor');
        setRoles(JSON.parse(cachedRole));
        return;
      }
    }

    try {
      const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/accesses');
      setRoles(response.data.data);
      localStorage.setItem(`roles`, JSON.stringify(data));
      localStorage.setItem(`roles_timestamp`, Date.now().toString());
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const cachedProject = localStorage.getItem(`projects_${usersCompanyId}`);
      const cachedTimestamp = localStorage.getItem(`projects_${usersCompanyId}_timestamp`);

      if (cachedProject && cachedTimestamp) {
        const age = Date.now() - parseInt(cachedTimestamp, 10);
        if (age < CACHE_DURATION) {
          console.log('Veriler localStorage\'dan yükleniyor');
          setCompanyProjects(JSON.parse(cachedProject));
          return;
        }
      }


      try {
        const response = await axios.get(
          `https://bold-animal-facf707bd9.strapiapp.com/api/companies/${usersCompanyId}?populate[projects][populate]=*`
        );
        const companyData = response.data.data;

        const filteredProjects = companyData.attributes.projects.data.filter(
          (project) => project.attributes.company.data.id === usersCompanyId
        );
        setCompanyProjects(filteredProjects);
        localStorage.setItem(`projects_${usersCompanyId}`, JSON.stringify(filteredProjects));
        localStorage.setItem(`projects_${usersCompanyId}_timestamp`, Date.now().toString());
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };
    fetchData();
  }, [usersCompanyId]);

  const handleInputPasswordChange = (e) => {
    const { name, value } = e.target;
    if (showEditModal) {
      setEditProject((prevEditProject) => {
        const updatedProject = { ...prevEditProject, [name]: value };
        return updatedProject;
      });
    } else {
      setNewProject((prevNewProject) => {
        const updatedProject = { ...prevNewProject, [name]: value };
        return updatedProject;
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (showEditModal) {
      setEditProject({ ...editProject, [name]: value });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    if (showEditModal) {
      setEditProject({ ...editProject, projectCoverPhoto: e.target.files[0] });
    } else {
      setNewProject({ ...newProject, projectCoverPhoto: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({
      projectName: newProject.projectName,
      projectPassword: newProject.projectPassword,
      company: usersCompanyId,
      projectCoverPhoto: newProject.projectCoverPhoto,
    }));
    if (newProject.projectCoverPhoto) {
      formData.append("files.projectCoverPhoto", newProject.projectCoverPhoto);
    }

    try {
      const response = await axios.post("https://bold-animal-facf707bd9.strapiapp.com/api/projects", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const createdProject = response.data.data;

      setCompanyProjects((prevProjects) => [
        ...prevProjects,
        {
          id: createdProject.id,
          attributes: {
            ...createdProject.attributes,
            projectCoverPhoto: createdProject.attributes.projectCoverPhoto || { data: null },
          },
        }
      ]);

      setShowModal(false);
      setNewProject({ projectName: "", projectPassword: "", projectCoverPhoto: null });

    } catch (error) {
      console.error("Error creating a new project:", error);
    }
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({
      projectName: editProject.projectName,
      projectPassword: editProject.projectPassword,
    }));
    if (editProject.projectCoverPhoto) {
      formData.append("files.projectCoverPhoto", editProject.projectCoverPhoto);
    }

    try {

      await axios.put(`https://bold-animal-facf707bd9.strapiapp.com/api/projects/${projectToEdit.id}`, formData);
      setShowEditModal(false);
      setEditProject({ projectName: "", projectPassword: "", projectCoverPhoto: null });
      const response = await axios.get(
        "https://bold-animal-facf707bd9.strapiapp.com/api/projects?populate=projectCoverPhoto"
      );
      const companyData = response.data.data;
      const filteredProjects = companyData.attributes.projects.data.filter(
        (project) => project.attributes.company.data.id === usersCompanyId
      );
      setCompanyProjects(filteredProjects);
    } catch (error) {
      console.error("Error editing the project:", error);
    }
  };

  const deleteModalOpen = (id) => {
    setShowDeleteModal(true);
    setProjectToDelete(id);
  };

  const editModalOpen = (projectId) => {
    const project = companyProjects.find(p => p.id === projectId);
    if (!project || !project.attributes) {
      console.error("Invalid project object:", projectId);
      return;
    }

    setShowEditModal(true);
    setProjectToEdit(project);
    setEditProject({
      projectName: project.attributes.projectName || "",
      projectCoverPhoto: project.attributes.projectCoverPhoto || null,
      projectPassword: project.attributes.projectPassword || "",
    });
  };

  const handleDeleteConfirm = () => {
    if (!projectToDelete) return;

    axios
      .delete(`https://bold-animal-facf707bd9.strapiapp.com/api/projects/${projectToDelete}`)
      .then((response) => {
        setCompanyProjects(
          companyProjects.filter((project) => project.id !== projectToDelete)
        );
        setShowDeleteModal(false);
        setProjectToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting project:", error);
      });
  };

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
