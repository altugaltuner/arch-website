import { useState, useEffect } from "react";
import axios from 'axios';
import "./ProjectSection.scss";

function ProjectSection({ onItemClick }) {

    const [projectFolders, setProjectFolders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/project-folders?populate=projectfolderimage');
                console.log(response.data); // Yanıtı kontrol etmek için konsola yazdırın
                setProjectFolders(response.data.data); // API'nin döndürdüğü veriyi kontrol edin ve uygun şekilde kaydedin
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="project-sections">
            <h2 className="section-header">Proje Dosyaları</h2>
            {projectFolders.map((folder) => (
                <div key={folder.id} className="project-section-one" onClick={() => onItemClick(folder)}>
                    <h3 className="project-section-title">{folder.attributes.projectFolderName}</h3>
                    <div className="project-images-container">
                        <img className="project-image"
                            src={`http://localhost:1337${folder.attributes.projectfolderimage.data.attributes.url}`}
                            alt={folder.attributes.projectFolderName}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectSection;
