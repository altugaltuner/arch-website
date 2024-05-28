import React from 'react';
import { useState, useEffect } from 'react';
import './ProjectTeam.scss';
import axios from 'axios';

const ProjectTeam = ({ onItemClick }) => {
    const [jobTitles, setJobTitles] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/professions?populate=professionImg');
                setJobTitles(response.data.data);
            } catch (error) {
                console.error('Error fetching professions', error);
            }
        };

        fetchProfessions();
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=profession,profilePic');
                setEmployees(response.data.data);
            } catch (error) {
                console.error('Error fetching employees', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleCardClick = (team) => {
        setSelectedTeam(team);
        onItemClick(team.attributes.professionName);
    };

    const filteredEmployees = employees ? employees.filter(employee =>
        employee.profession && employee.profession.id === selectedTeam?.id
    ) : [];

    return (
        <div className="project-teams-container">
            <h2 className="section-header">Proje Ekipleri</h2>
            {selectedTeam ? (
                <div className="new-div">
                    <button onClick={() => setSelectedTeam(null)}>Back</button>
                    <h3>{selectedTeam.attributes.professionName}</h3>
                    <div className="employees-grid">
                        {filteredEmployees.map((employee, index) => (
                            <div key={index} className="employee-card">
                                <h4>{employee.username}</h4>
                                <img src={`http://localhost:1337${employee.profilePic.url}`} alt={employee.username} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="teams-grid">
                    {jobTitles.map((team, index) => (
                        <div key={index} className="team-card" onClick={() => handleCardClick(team)}>
                            <h3 className="team-title">{team.attributes.professionName}</h3>
                            <div className="team-images">
                                <img src={`http://localhost:1337${team.attributes.professionImg.data.attributes.url}`} alt={team.attributes.professionName} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectTeam;
