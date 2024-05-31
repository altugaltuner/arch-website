import React, { useState } from "react";
import ProjectInside from '../ProjectInside/ProjectInside';
import "../MyActiveProjects/MyActiveProjects.scss";

function MyActiveProjects() {
    const handleProjectClick = (project) => {
        console.log("Sırf bunu almak için böyle yapmam şart mı ? ", project);

    };

    return (
        <div className="myactive-projects-main">
            <div className="active-projects">
                <div className="active-projects-container">
                    <ProjectInside onProjectClick={handleProjectClick} />
                </div>
            </div>
        </div>
    );
};

export default MyActiveProjects;
