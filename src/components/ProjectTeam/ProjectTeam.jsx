import React, { useState, useEffect } from 'react';
import './ProjectTeam.scss';
import axios from 'axios';
import AddUserModal from '../../components/AddUserModal/AddUserModal';

const ProjectTeam = ({ clickedProject }) => {
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);

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
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=profession,projects,profilePic');
                setEmployees(response.data);
                setAllUsers(response.data);
            } catch (error) {
                console.error('Error fetching employees', error);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        if (clickedProject && clickedProject.attributes && clickedProject.attributes.users) {
            const projectUserIds = clickedProject.attributes.users.data.map(user => user.id);
            const available = allUsers.filter(user => !projectUserIds.includes(user.id));
            setAvailableUsers(available);
        }
    }, [allUsers, clickedProject]);

    const handleAddUsers = async (userIds) => {
        try {
            await axios.put(`http://localhost:1337/api/projects/${clickedProject.id}`, {
                data: {
                    users: [...clickedProject.attributes.users.data.map(user => user.id), ...userIds]
                }
            });
            setShowModal(false);
            // Update the employees state to reflect the change
            const updatedProject = await axios.get(`http://localhost:1337/api/projects/${clickedProject.id}?populate=*`);
            setEmployees(updatedProject.data.data.attributes.users.data);
        } catch (error) {
            console.error('Error adding users to project team', error);
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.projects.some(project => project.id === clickedProject.id)
    );

    return (
        <div className="project-teams-container">
            {roles.map(role => role.attributes.role === "Admin" && (
                <button
                    className="add-team-btn"
                    onClick={() => setShowModal(true)}
                >
                    Çalışan Ekle
                </button>
            ))}

            <div className="new-div">
                <h3 className='new-div-selected-profession'>{clickedProject.attributes.projectName}</h3>
                <div className="employees-grid">
                    {filteredEmployees.map((employee, index) => (
                        <div className="employee-card" key={index}>
                            <div className="profile-pic">
                                <img
                                    className="profile-pic-inner"
                                    src={employee.profilePic ? `http://localhost:1337${employee.profilePic.url}` : ""}
                                    alt=""
                                />
                            </div>
                            <div className="employee-info">
                                <h3 className='employee-info-username'>{employee.username}</h3>
                                <p className='employee-info-professionName'>{employee.profession.professionName}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <AddUserModal
                show={showModal}
                onClose={() => setShowModal(false)}
                users={availableUsers}
                handleAddUsers={handleAddUsers}
            />
        </div>
    );
};

export default ProjectTeam;
