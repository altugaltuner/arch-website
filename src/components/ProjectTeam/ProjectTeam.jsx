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
        console.log('clickedProject:', clickedProject);
        console.log('allUsers:', allUsers);

        if (clickedProject?.attributes?.users?.data) {
            const projectUserIds = clickedProject.attributes.users.data.map(user => user.id);
            const available = allUsers.filter(user => !projectUserIds.includes(user.id));
            setAvailableUsers(available);
            console.log('Available users:', available);
        } else {
            console.log('clickedProject.attributes.users.data is undefined');
            if (clickedProject) {
                console.log('clickedProject.attributes:', clickedProject.attributes);
                if (clickedProject.attributes) {
                    console.log('clickedProject.attributes.users:', clickedProject.attributes.users);
                }
            }
        }
    }, [allUsers, clickedProject]);

    const handleAddUsers = async (userIds) => {
        try {
            await axios.put(`http://localhost:1337/api/projects/${clickedProject.id}?populate=*`, {
                data: {
                    users: [...clickedProject.attributes.users.data.map(user => user.id), ...userIds]
                }
            });
            // Yeni kullanıcıları clickedProject'e hemen ekleyin
            const newUsers = userIds.map(id => allUsers.find(user => user.id === id));
            setEmployees(prev => [...prev, ...newUsers]);
            setShowModal(false);
        } catch (error) {
            console.error('Error adding users to project team', error);
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.projects && employee.projects.some(project => project.id === clickedProject.id)
    );

    return (
        <div className="project-teams-container">
            {roles.map(role => role.attributes.role === "Admin" && (
                <>
                    <button
                        className="add-team-btn"
                        onClick={() => setShowModal(true)}
                    >
                        Çalışan Ekle
                    </button>
                    <button className='delete-team-btn'>Çalışan Çıkar</button>
                </>

            ))}

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
                show={showModal}
                onClose={() => setShowModal(false)}
                users={availableUsers}  // This should be `availableUsers` to ensure only available users are shown
                handleAddUsers={handleAddUsers}
            />

        </div>
    );
};

export default ProjectTeam;
