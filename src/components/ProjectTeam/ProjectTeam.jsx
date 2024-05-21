import React from 'react';
import { useState, useEffect } from 'react';
import './ProjectTeam.scss';
import axios from 'axios';

const ProjectTeam = ({ onItemClick }) => {

    const [jobTitles, setJobTitles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/professions?populate=professionImg');
                console.log(response.data); // Yanıtı kontrol etmek için konsola yazdırın
                setJobTitles(response.data.data); // API'nin döndürdüğü veriyi kontrol edin ve uygun şekilde kaydedin
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="project-teams-container">
            <h2 className="section-header">Proje Ekipleri</h2>
            <div className="teams-grid">
                {jobTitles.map((team, index) => (
                    <div key={index} className="team-card" onClick={() => onItemClick(team.name)}>
                        <h3 className="team-title">{team.attributes.professionName}</h3>
                        <div className="team-images">
                            <img src={`http://localhost:1337${team.attributes.professionImg.data.attributes.url}`} alt={team.name} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectTeam;


