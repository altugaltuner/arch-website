import { useEffect, useState } from "react";
import './SelectedItemSection.scss';
import axios from "axios";

function SelectedItemSection({ selectedProject, companyProjects }) {

    console.log("companyProjects[0]", companyProjects[0]);
    console.log("selectedProject", selectedProject);

    const [projectFiles, setProjectFiles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate[projectAllFiles][populate]=*');
                console.log(response.data);
                setProjectFiles(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='selected-item-section'>
            {selectedProject && companyProjects.map(project => (
                selectedProject.attributes.projectName === project.attributes.projectName && (
                    <div key={project.id}>
                        <p>{project.attributes.projectName} Dosyaları</p>
                        {
                            projectFiles.map((file) => (
                                <div key={file.id} className="project-files">
                                    <h3 className="project-file-title">{file.attributes.projectAllFiles.projectPhotoshoots.data.attributes.name}</h3>
                                    <div className="project-images-container">
                                        <img className="project-image"
                                            src={`http://localhost:1337${file.attributes.projectAllFiles.projectPhotoshoots.data.attributes.url}`}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            ))}
        </div>
    );
}

export default SelectedItemSection;
