import { useEffect, useState } from "react";
import './SelectedItemSection.scss';
import axios from "axios";

function SelectedItemSection({ activeProjectTitle, companyProjects }) {

    const [projectFiles, setProjectFiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate[projectAllFiles][populate]=*');
                setProjectFiles(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    const renderFile = (file) => {
        const { name, url, ext } = file.attributes;
        return (
            <div key={file.id} className="project-file">
                <p className="file-name">{name}</p>
                <p className="file-type">{ext}</p>
                <a href={`http://localhost:1337${url}`} download className="download-link">Download</a>
            </div>
        );
    };

    const activeProjectFiles = projectFiles.filter(project =>
        project.attributes.projectName === activeProjectTitle
    );

    return (
        <div className='selected-item-section'>
            <h2>{activeProjectTitle} Dosyaları</h2>
            {activeProjectFiles.map(projectFile => {
                const { projectAllFiles } = projectFile.attributes;
                return (
                    <div key={projectFile.id} className="project-file-container">
                        {projectAllFiles.architecturalPlans.data && projectAllFiles.architecturalPlans.data.map(renderFile)}
                        {projectAllFiles.staticPlans.data && projectAllFiles.staticPlans.data.map(renderFile)}
                        {projectAllFiles.electricalPlans.data && projectAllFiles.electricalPlans.data.map(renderFile)}
                        {projectAllFiles.plumbingPlans.data && projectAllFiles.plumbingPlans.data.map(renderFile)}
                        {projectAllFiles.financialPapers.data && projectAllFiles.financialPapers.data.map(renderFile)}
                        {projectAllFiles.contractPapers.data && projectAllFiles.contractPapers.data.map(renderFile)}
                        {projectAllFiles.meetingNotes.data && projectAllFiles.meetingNotes.data.map(renderFile)}
                        {projectAllFiles.dailyReports.data && projectAllFiles.dailyReports.data.map(renderFile)}
                        {projectAllFiles.projectPhotoshoots.data && projectAllFiles.projectPhotoshoots.data.map(renderFile)}
                        {projectAllFiles.projectRenders.data && projectAllFiles.projectRenders.data.map(renderFile)}

                        {/* soldaki truthy ise sağdakini çalıştır: && */}
                    </div>
                );
            })}
        </div>
    );
}

export default SelectedItemSection;
