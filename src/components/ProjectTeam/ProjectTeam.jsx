import React from 'react';
import './ProjectTeam.scss';

import jobTitles from '../../database/jobTitles';

const ProjectTeam = ({ onItemClick }) => {
    return (
        <div className="project-teams-container">
            <h2 className="section-header">Proje Ekipleri</h2>
            <div className="teams-grid">
                {jobTitles.map((team, index) => (
                    <div key={index} className="team-card" onClick={() => onItemClick(team.name)}>
                        <h3 className="team-title">{team.name}</h3>
                        <div className="team-images">
                            <img src={team.photo} alt={team.name} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectTeam;
