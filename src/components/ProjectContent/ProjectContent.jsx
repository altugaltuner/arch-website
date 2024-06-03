import React from 'react';
import ProjectSection from '../../components/ProjectSection/ProjectSection';
import ProjectTeam from '../../components/ProjectTeam/ProjectTeam';

function ProjectContent({ currentTab, handleItemClick }) {
    const activeComponents = {
        allprojects: <ProjectSection onItemClick={handleItemClick} />,
        team: <ProjectTeam onItemClick={handleItemClick} />,
    };

    return activeComponents[currentTab] || <ProjectSection onItemClick={handleItemClick} />;
}

export default ProjectContent;
