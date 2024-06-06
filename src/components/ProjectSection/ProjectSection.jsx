import { useState, useEffect } from "react";
import axios from 'axios';
import "./ProjectSection.scss";

function ProjectSection({ clickedProject }) {
    const [projectFolders, setProjectFolders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/projects?populate=*');
                setProjectFolders(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    // Filter project folders based on the clicked project ID
    const filteredFolders = clickedProject
        ? projectFolders.find((project) => project.id === clickedProject.id)?.attributes.project_folders.data
        : [];

    return (
        <div className="project-folders">
            {filteredFolders && filteredFolders.length > 0 ? (
                filteredFolders.map((folder) => (
                    <div className="project-folder" key={folder.id}>
                        <h2 className="project-folder-name">{folder.attributes.projectFolderName}</h2>
                        <img
                            className="project-folder-image"
                            src="https://w7.pngwing.com/pngs/603/506/png-transparent-directory-icon-computer-file-folder-miscellaneous-angle-image-file-formats.png"
                            alt="folder-icon"
                        />
                    </div>
                ))
            ) : (
                <p>No folders available for the selected project.</p>
            )}
        </div>
    );
}

export default ProjectSection;
