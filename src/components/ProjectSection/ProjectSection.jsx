import { useState, useEffect } from "react";
import axios from 'axios';
import "./ProjectSection.scss";

function ProjectSection({ onItemClick, clickedProject }) {

    const [projectFolders, setProjectFolders] = useState([]);
    console.log("Clicked Project in ProjectSectipn isssss:", clickedProject); // Debug için eklendi
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/project-folders?populate=projectfolderimage');
                console.log(response.data);
                setProjectFolders(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="project-sections">
            {projectFolders.map((folder) => (
                <div key={folder.id} className="project-section-one" onClick={() => onItemClick(folder)}>
                    <h3 className="project-section-title">{folder.attributes.projectFolderName}</h3>
                    <div className="project-images-container">
                        <img className="project-image"
                            src={`http://localhost:1337${folder.attributes.projectfolderimage.data.attributes.url}`}
                            alt="project-image"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectSection;
