import './ProjectHeader.scss';

function ProjectHeader({ clickedProject, onTabChange }) {
    return (
        <div className="project-section-main">
            <div className="projects-page-content-header">
                <h2 className="active-project-title">{clickedProject ? clickedProject.attributes.projectName : "Yeşil Vadi Konutları"}</h2>
                <div className="active-project-tabs">
                    <button className="active-project-btn" type="button" onClick={() => onTabChange("files")}>Proje Dosyaları</button>
                    <button className="active-project-btn" type="button" onClick={() => onTabChange("team")} >Proje Ekipleri</button>
                </div>
            </div>
        </div>
    );
}

export default ProjectHeader;
