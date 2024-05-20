import { useState } from "react";
import "./ProjectSection.scss";
import projectFolders from "../../database/projectFolders";

function ProjectSection({ onItemClick }) {

    return (
        <div className="project-sections">
            <h2 className="section-header">Proje Dosyaları</h2>
            {projectFolders.map((section, index) => (
                <div key={index} className="project-section-one" onClick={() => onItemClick(section.title)}>
                    <h3 className="project-section-title">{section.title}</h3>
                    <div className="project-images-container">
                        {section.images.map((image, idx) => (
                            <img key={idx} src={image} alt={section.title} className="project-image" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
export default ProjectSection;
