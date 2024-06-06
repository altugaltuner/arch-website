import { useState, useEffect } from "react";
import axios from 'axios';
import "./ProjectSection.scss";

function ProjectSection({ onItemClick, clickedProject }) {

    const [projectFolders, setProjectFolders] = useState([]);

    console.log("Clicked Project in ProjectSectipn isssss:", clickedProject); // Debug için eklendi

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate=*');
                setProjectFolders(response.data.data);
                console.log("asasew323", response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="project-folders">
            {projectFolders.map((projectFolder) => (
                <div className="project-folder" key={projectFolder.id}>
                    <h2 className="project-folder-name">{projectFolder.attributes.project_folders.data[0].attributes.projectFolderName}</h2>
                    <img className="project-folder-image" src={"https://w7.pngwing.com/pngs/603/506/png-transparent-directory-icon-computer-file-folder-miscellaneous-angle-image-file-formats.png"} alt="project-photo" />
                </div>
            ))}

        </div>
    );
}

export default ProjectSection;
