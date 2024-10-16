import { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectsMainPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";
import AddNewProjectModal from "../../components/AddNewProjectModal/AddNewProjectModal";
import ProjectCardsColumn from "../../components/ProjectCardsColumn/ProjectCardsColumn";
import EditProjectModal from "../../components/EditProjectModal/EditProjectModal";

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
    try {
      const response = await axios.get('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/accesses');
      setRoles(response.data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  useEffect(() => {
    getRoles();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://wonderful-pleasure-64045d06ec.strapiapp.com/api/companies/${usersCompanyId}?populate[projects][populate]=*`
        );
        const companyData = response.data.data;

        const filteredProjects = companyData.attributes.projects.data.filter(
          (project) => project.attributes.company.data.id === usersCompanyId
        );
        setCompanyProjects(filteredProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
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

    const token = localStorage.getItem('token');

    if (!token) {
      console.error("No token found, cannot authenticate request.");
      return;
    }

    try {
      const response = await axios.post("https://wonderful-pleasure-64045d06ec.strapiapp.com/api/projects", formData, {
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
      console.error("Error creating project:", error.response?.data || error.message);
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
      await axios.put(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/projects/${projectToEdit.id}`, formData);
      setShowEditModal(false);
      setEditProject({ projectName: "", projectPassword: "", projectCoverPhoto: null });

      const response = await axios.get(
        "https://wonderful-pleasure-64045d06ec.strapiapp.com/api/projects?populate=projectCoverPhoto"
      );
      const companyData = response.data.data;
      const filteredProjects = companyData.attributes.projects.data.filter(
        (project) => project.attributes.company.data.id === usersCompanyId
      );
      setCompanyProjects(filteredProjects);
    } catch (error) { }
  };

  const deleteModalOpen = (id) => {
    setShowDeleteModal(true);
    setProjectToDelete(id);
  };

  const editModalOpen = (projectId) => {
    const project = companyProjects.find(p => p.id === projectId);
    if (!project || !project.attributes) {
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
      .delete(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/projects/${projectToDelete}`)
      .then(() => {
        setCompanyProjects(
          companyProjects.filter((project) => project.id !== projectToDelete)
        );
        setShowDeleteModal(false);
        setProjectToDelete(null);
      })
      .catch(() => { });
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
