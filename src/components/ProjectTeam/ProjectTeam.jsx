import React from 'react';
import { useState, useEffect } from 'react';
import './ProjectTeam.scss';
import axios from 'axios';

const ProjectTeam = () => {
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
                const response = await axios.get('http://localhost:1337/api/users?populate=profession,projects,profilePic');
                setEmployees(response.data);
                console.log('employees33:', response.data);
            } catch (error) {
                console.error('Error fetching employees', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleCardClick = (team) => {
        console.log('Selected team:', team);
        setSelectedTeam(team);
    };

    console.log('employees:', employees);
    console.log('employees:', employees[0]);


    return (
        <div className="project-teams-container">
            {selectedTeam ? (
                <div className="new-div">
                    <button className='new-div-backbtn' onClick={() => setSelectedTeam(null)}>Geri Dön</button>
                    <h3 className='new-div-selected-profession'>{selectedTeam.attributes.professionName}</h3>
                    <div className="employees-grid">
                        {employees.map((employee, index) => (
                            <div className="employee-card" key={index} onClick={() => openEmployeeCardModal(employee)}>
                                <div className="profile-pic">
                                    <img className="profile-pic-inner" src={`http://localhost:1337${employee.profilePic.url}`} alt="" srcSet="" />
                                </div>
                                <div className="employee-info">
                                    <h3 className='employee-info-username'>{employee.username}</h3>
                                    <p className='employee-info-professionName'>{employee.profession.professionName}</p>
                                </div>
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
