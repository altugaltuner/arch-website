import { useEffect, useState } from "react";
import './SelectedItemSection.scss';
import axios from "axios";

function SelectedItemSection({ selectedProject, companyProjects }) {

    console.log("companyProjects[0]", companyProjects[0]);
    console.log("selectedProject", selectedProject);

    const [projectFolders, setProjectFolders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/project-revises?populate=*');
                console.log(response.data);
                setProjectFolders(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='selected-item-section'>
            {selectedProject && selectedProject.attributes.projectName === companyProjects[0].attributes.projectName && (
                <p>Yeşil Vadi Dosyaları</p>
            )}
            {selectedProject && selectedProject.attributes.projectName === companyProjects[1].attributes.projectName && (
                <p>Mavi Sahil Dosyaları</p>
            )}
            {selectedProject && selectedProject.attributes.projectName === companyProjects[2].attributes.projectName && (
                <p>Altın Kuleler</p>
            )}
            {selectedProject && selectedProject.attributes.projectName === companyProjects[3].attributes.projectName && (
                <p>Gökyüzü Park Evleri</p>
            )}
            {selectedProject && selectedProject.attributes.projectName === companyProjects[4].attributes.projectName && (
                <p>Kırmızı Yıldız Apartmanı</p>
            )}
            {selectedProject && selectedProject.attributes.projectName === companyProjects[5].attributes.projectName && (
                <p>Güneş Plaza</p>
            )}
        </div>
    );
}

export default SelectedItemSection;
