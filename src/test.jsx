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
    console.log("Edit project with id:", projectId);
};

