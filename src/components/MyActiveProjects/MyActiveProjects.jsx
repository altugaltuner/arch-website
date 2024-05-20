import React, { useState } from "react";
import "./MyActiveProjects.scss";

import projectList from "../../database/companyProjects.js/projectList.js";

function MyActiveProjects() {

    return (
        <div className="myactive-projects-main">
            <div className="active-projects">
                <h1 className="active-projects-header">My Active Projects</h1>
                <div className="active-projects-container">
                    {projectList.map((project, index) => (
                        <div className="active-project" key={index}>
                            <div className="project-name">{project.name}</div>
                            <img className="project-photo-active" src={project.photo} alt={project.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyActiveProjects;
