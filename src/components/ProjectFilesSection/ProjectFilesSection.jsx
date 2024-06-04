import React from 'react';
import SelectedItemSection from '../../components/SelectedItemSection/SelectedItemSection';

function ProjectFilesSection({ activeProjectTitle, companyProjects }) {
    return (
        <div className="project-files-section">
            <SelectedItemSection activeProjectTitle={activeProjectTitle} companyProjects={companyProjects} />
        </div>
    );
}

export default ProjectFilesSection;
