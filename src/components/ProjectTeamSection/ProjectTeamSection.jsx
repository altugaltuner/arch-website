import React from 'react';
import ProjectTeam from '../../components/ProjectTeam/ProjectTeam';

function ProjectTeamSection({ selectedTeam, onItemClick }) {
    return (
        <div className="project-team-section">
            <ProjectTeam selectedTeam={selectedTeam} onItemClick={onItemClick} />
        </div>
    );
}

export default ProjectTeamSection;
