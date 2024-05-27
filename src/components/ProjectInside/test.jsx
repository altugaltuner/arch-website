import React, { useState } from "react";
import ProjectInside from './ProjectInside';
import "./MyActiveProjects.scss";

function MyActiveProjects() {
    const handleProjectClick = (project) => {
        console.log("Seçilen proje:", project);
        // Add any additional logic for when a project is clicked
    };

    return (
        <div className="myactive-projects-main">
            <div className="active-projects">
                <h1 className="active-projects-header">My Active Projects</h1>
                <div className="active-projects-container">
                    <ProjectInside onProjectClick={handleProjectClick} />
                </div>
            </div>
        </div>
    );
};

export default MyActiveProjects;
