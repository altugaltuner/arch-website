import { useEffect, useState } from "react";
import './SelectedItemSection.scss';
import axios from "axios";

function SelectedItemSection({ activeProjectTitle, companyProjects }) {

    const [projectFiles, setProjectFiles] = useState([]);
    const [fileExtensions, setFileExtensions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/file-extension-logos?populate=*');
                setFileExtensions(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, []);

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

    const getLogoUrl = (ext) => {
        const extension = fileExtensions.find(item => item.attributes.extensionName === ext);
        return extension ? `http://localhost:1337${extension.attributes.extensionLogo.data.attributes.url}` : '';
    };

    const renderFile = (file) => {
        const { name, url, ext } = file.attributes;
        const logoUrl = getLogoUrl(ext.replace('.', ''));
        return (
            <div key={file.id} className="project-file">
                <p className="file-name">{name}</p>
                <img className="file-logo-image" src={logoUrl} alt={`${ext} logo`} />
                <a href={`http://localhost:1337${url}`} download className="file-download-link">Download</a>
            </div>
        );
    };

    const [activeProjectFiles, setActiveProjectFiles] = useState([]);

    const activePs = projectFiles.map(project => project.attributes.projectName);

    useEffect(() => {
        const activeProjectFiles = projectFiles.filter(project => project.attributes.projectName === activeProjectTitle);
        setActiveProjectFiles(activeProjectFiles);
    }, [activeProjectTitle, projectFiles]);

    return (
        <div className='selected-item-section'>
            <h2 className="selected-header">{activeProjectTitle} Dosyalar</h2>
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

                        {/* soldaki truthy ise yani varsa sağdakini çalıştır: && */}
                    </div>
                );
            })}
        </div>
    );
}

export default SelectedItemSection;
