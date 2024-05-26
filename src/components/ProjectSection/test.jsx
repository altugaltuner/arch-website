import { useEffect, useState } from "react";
import './SelectedItemSection.scss';
import axios from "axios";

function SelectedItemSection({ selectedProject, companyProjects }) {

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

    return (
        <div className='selected-item-section'>
            {selectedProject && companyProjects.map(project => (
                selectedProject.attributes.projectName === project.attributes.projectName && (
                    <div key={project.id}>
                        <h2>{project.attributes.projectName} Dosyaları</h2>
                        {projectFiles.map(projectFile => {
                            const { projectAllFiles } = projectFile.attributes;
                            return (
                                <div key={projectFile.id} className="project-file-container">
                                    {projectAllFiles.architecturalPlans?.data?.map(renderFile)}
                                    {projectAllFiles.staticPlans?.data?.map(renderFile)}
                                    {projectAllFiles.electricalPlans?.data?.map(renderFile)}
                                    {projectAllFiles.plumbingPlans?.data?.map(renderFile)}
                                    {projectAllFiles.financialPapers?.data?.map(renderFile)}
                                    {projectAllFiles.contractPapers?.data?.map(renderFile)}
                                    {projectAllFiles.meetingNotes?.data?.map(renderFile)}
                                    {projectAllFiles.dailyReports?.data?.map(renderFile)}
                                    {projectAllFiles.projectPhotoshoots?.data?.map(renderFile)}
                                    {projectAllFiles.projectRenders?.data?.map(renderFile)}
                                </div>
                            );
                        })}
                    </div>
                )
            ))}
        </div>
    );
}

export default SelectedItemSection;
