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
  });

  const [editProject, setEditProject] = useState({
    projectName: "",
    projectCoverPhoto: null,
  });

  async function getRoles() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await axios.get("http://localhost:1337/api/accesses");
      console.log("Roles response:", response.data);
      setRoles(response.data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getRoles();
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get(
          "http://localhost:1337/api/projects?populate=projectCoverPhoto"
        );
        console.log("Projects response:", response.data);
        setCompanyProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    if (localStorage.getItem("token")) {
      fetchData();
    }
  }, []);

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
    formData.append(
      "data",
      JSON.stringify({ projectName: newProject.projectName })
    );
    if (newProject.projectCoverPhoto) {
      formData.append("files.projectCoverPhoto", newProject.projectCoverPhoto);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      await axios.post("http://localhost:1337/api/projects", formData);
      setShowModal(false);
      setNewProject({ projectName: "", projectCoverPhoto: null });
      // Refetch projects after adding a new one
      const response = await axios.get(
        "http://localhost:1337/api/projects?populate=projectCoverPhoto"
      );
      setCompanyProjects(response.data.data);
    } catch (error) {
      console.error("Error creating a new project:", error);
    }
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({ projectName: editProject.projectName })
    );
    if (editProject.projectCoverPhoto) {
      formData.append("files.projectCoverPhoto", editProject.projectCoverPhoto);
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      await axios.put(`http://localhost:1337/api/projects/${projectToEdit.id}`, formData);
      setShowEditModal(false);
      setEditProject({ projectName: "", projectCoverPhoto: null });
      // Refetch projects after editing
      const response = await axios.get(
        "http://localhost:1337/api/projects?populate=projectCoverPhoto"
      );
      setCompanyProjects(response.data.data);
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
    });

  };

  const handleDeleteConfirm = () => {
    if (!projectToDelete) return;

    axios
      .delete(`http://localhost:1337/api/projects/${projectToDelete}`)
      .then((response) => {
        console.log(response);
        console.log("Project deleted successfully");
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
        handleFileChange={handleFileChange}
        handleEditSubmit={handleEditSubmit}
      />
    </div>
  );
}

export default ProjectsMainPage;
