import React, { useState, useEffect } from 'react';
import './ProjectTeam.scss';
import axios from 'axios';

const ProjectTeam = () => {
    const [jobTitles, setJobTitles] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newTeam, setNewTeam] = useState({
        teamName: ""
    });

    async function getRoles() {
        try {
            const response = await axios.get('http://localhost:1337/api/accesses');
            setRoles(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

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
            } catch (error) {
                console.error('Error fetching employees', error);
            }
        };

        fetchEmployees();
    }, []);

    const handleCardClick = (team) => {
        setSelectedTeam(team);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTeam({ ...newTeam, [name]: value });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({ teamName: newTeam.teamName }));

        try {
            await axios.post('http://localhost:1337/api/project-teams', formData);
            setShowModal(false);
            setNewTeam({ teamName: "" });
            // Refetch teams after adding a new one
            const response = await axios.get('http://localhost:1337/api/professions?populate=professionImg');
            setJobTitles(response.data.data);
        } catch (error) {
            console.error('Error creating a new team', error);
        }
    };

    return (
        <div className="project-teams-container">
            {roles.map(role => role.attributes.role === "Admin" && (
                <button
                    className="add-team-btn"
                    onClick={() => setShowModal(true)}
                >
                    Takım Ekle
                </button>
            ))}

            {selectedTeam ? (
                <div className="new-div">
                    <button className='new-div-backbtn' onClick={() => setSelectedTeam(null)}>Geri Dön</button>
                    <h3 className='new-div-selected-profession'>{selectedTeam.attributes.professionName}</h3>
                    <div className="employees-grid">
                        {employees.map((employee, index) => (
                            <div className="employee-card" key={index}>
                                <div className="profile-pic">
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
                    <div className='team-card'>Tüm Çalışanlar</div>
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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Yeni Takım Oluştur</h2>
                        <input
                            type="text"
                            name="teamName"
                            placeholder="Takım Adı"
                            value={newTeam.teamName}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSubmit}>Oluştur</button>
                        <button onClick={() => setShowModal(false)}>İptal</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectTeam;
