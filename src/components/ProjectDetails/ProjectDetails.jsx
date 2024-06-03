import React from 'react';
import SelectedItemSection from '../../components/SelectedItemSection/SelectedItemSection';
import ProjectBasedRevisions from '../../components/ProjectBasedRevisions/ProjectBasedRevisions';

function ProjectDetails({ selectedItem, activeFolder, companyProjects, selectedProject, onBack }) {
    return (
        <div className="new-section">
            <div className="selected-folder-items">
                <h2 className="new-section-header">
                    {selectedItem.attributes && selectedItem.attributes.projectName ? selectedItem.attributes.projectName : "No Project Name"}
                </h2>
                <SelectedItemSection activeProjectTitle={activeFolder} companyProjects={companyProjects} />
            </div>
            <ProjectBasedRevisions clickedProject={selectedProject} />
            <button className="go-back-btn" onClick={onBack}>Back</button>
        </div>
    );
}

export default ProjectDetails;
