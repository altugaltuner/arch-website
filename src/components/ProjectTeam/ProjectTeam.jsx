import React, { useState, useEffect } from 'react';
import './ProjectTeam.scss';
import axios from 'axios';
import AddUserModal from '../../components/AddUserModal/AddUserModal';
import RemoveUserModal from '../../components/RemoveUserModal/RemoveUserModal';

const ProjectTeam = ({ clickedProject }) => {
    const [employees, setEmployees] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
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
        if (clickedProject?.attributes?.users?.data) {
            const projectUserIds = clickedProject.attributes.users.data.map(user => user.id);
            const available = allUsers.filter(user => !projectUserIds.includes(user.id));
            setAvailableUsers(available);
        } else {
            console.log('clickedProject.attributes.users.data is undefined');
        }
    }, [allUsers, clickedProject]);

    const handleAddUsers = async (userIds) => {
        try {
            await axios.put(`http://localhost:1337/api/projects/${clickedProject.id}?populate=*`, {
                data: {
                    users: [...clickedProject.attributes.users.data.map(user => user.id), ...userIds]
                }
            });

            const updatedEmployees = [
                ...employees,
                ...userIds.map(id => allUsers.find(user => user.id === id))
            ];

            setEmployees(updatedEmployees);

            // Update available users after adding new users
            const updatedAvailableUsers = availableUsers.filter(user => !userIds.includes(user.id));
            setAvailableUsers(updatedAvailableUsers);

            setShowAddModal(false);
        } catch (error) {
            console.error('Error adding users to project team', error);
        }
    };

    const handleRemoveUsers = async (userIds) => {
        try {
            await axios.put(`http://localhost:1337/api/projects/${clickedProject.id}?populate=*`, {
                data: {
                    users: clickedProject.attributes.users.data.filter(user => !userIds.includes(user.id))
                }
            });
            setEmployees(prev => prev.filter(employee => !userIds.includes(employee.id)));
        } catch (error) {
            console.error('Error removing users from project team', error);
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.projects && employee.projects.some(project => project.id === clickedProject.id)
    );

    useEffect(() => {
        // Debugging logs to check the state updates
        console.log('Employees:', employees);
        console.log('Available Users:', availableUsers);
    }, [employees, availableUsers]);

    return (
        <div className="project-teams-container">
            <div className='admin-buttons'>
                {roles.map(role => role.attributes.role === "Admin" && (
                    <>
                        <button
                            className="add-team-btn"
                            onClick={() => setShowAddModal(true)}
                        >
                            Çalışan Ekle
                        </button>
                        <button className='delete-team-btn' onClick={() => setShowRemoveModal(true)}>Çalışan Çıkar</button>
                    </>
                ))}
            </div>
            <div className="employees-grid">
                {filteredEmployees.map((employee, index) => (
                    <div className="employee-card" key={index}>
                        <div className="profile-pic">
                            <img
                                className="profile-pic-inner"
                                src={employee.profilePic?.url ? `http://localhost:1337${employee.profilePic.url}` : ""}
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

            <AddUserModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                users={availableUsers}
                handleAddUsers={handleAddUsers}
            />

            <RemoveUserModal
                show={showRemoveModal}
                onClose={() => setShowRemoveModal(false)}
                employees={filteredEmployees}
                handleRemoveUsers={handleRemoveUsers}
            />
        </div>
    );
};

export default ProjectTeam;
