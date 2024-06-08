import React, { useState, useEffect } from "react";
import "./WorkersPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import axios from 'axios';

function WorkersPage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState('Tümü');
    const [jobTitles, setJobTitles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showAddingModal, setShowAddingModal] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        username: "",
        email: "",
        profilePic: null
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
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=profession,projects,profilePic');
                console.log(response.data); // Log the response to check the data
                setEmployees(response.data); // Check the structure of the response and adjust accordingly

                // Extract unique job titles
                const titles = response.data.map(employee => employee.profession.professionName);
                const uniqueTitles = Array.from(new Set(titles));
                setJobTitles(uniqueTitles);

            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewEmployee({ ...newEmployee, profilePic: e.target.files[0] });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({ username: newEmployee.username, email: newEmployee.email }));
        if (newEmployee.profilePic) {
            formData.append('files.profilePic', newEmployee.profilePic);
        }

        try {
            await axios.post('http://localhost:1337/api/users', formData);
            setShowAddingModal(false);
            setNewEmployee({ username: "", email: "", profilePic: null });
            // Refetch employees after adding a new one
            const response = await axios.get('http://localhost:1337/api/users?populate=profession,projects,profilePic');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error creating a new employee', error);
        }
    };

    const filteredEmployees = selectedJobTitle === 'Tümü'
        ? employees
        : employees.filter(employee => employee.profession.professionName === selectedJobTitle);

    return (
        <div className="workers-page-main">
            <Navigation />
            <div className="company-grid">
                <div className="sidebar">
                    <ul>
                        <li
                            className="job-titles-for-workersPage"
                            onClick={() => handleJobTitleClick('Tümü')}
                        >
                            Tümü
                        </li>
                        {jobTitles.map((title, index) => (
                            <li
                                className="job-titles-for-workersPage"
                                key={index}
                                onClick={() => handleJobTitleClick(title)}
                            >
                                {title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="employee-grid">

                    {roles.map(role => role.attributes.role === "Admin" && (
                        <button
                            className="add-employee-btn"
                            onClick={() => setShowAddingModal(true)}
                        >
                            Çalışan Ekle
                        </button>
                    ))}

                    {filteredEmployees.map((employee, index) => (
                        <div className="employee-card" key={index} onClick={() => openEmployeeCardModal(employee)}>
                            <div className="profile-pic">
                                <img className="profile-pic-inner" src={`http://localhost:1337${employee.profilePic.url}`} alt="" srcSet="" />
                            </div>
                            <div className="employee-info">
                                <h3>{employee.username}</h3>
                                <p>{employee.email}</p>
                                <p>{employee.profession.professionName}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedEmployee && (
                    <div className="employee-card-modal">
                        <div className="employee-card-modal-inner">
                            <div className="profile-pic">
                                <img className="profile-pic-inner" src={`http://localhost:1337${selectedEmployee.profilePic.url}`} alt="" srcSet="" />
                            </div>
                            <p>{selectedEmployee.username}</p>
                            <p>{selectedEmployee.email}</p>
                            <p>{selectedEmployee.profession.professionName}</p>
                            <button className="send-email-btn" onClick={() => sendEmail(selectedEmployee.email)}>Send Email</button>
                            <button className="modal-close-btn" onClick={closeEmployeeCardModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>

            {showAddingModal && (
                <div className="add-new-employee-modal">
                    <div className="new-employee-modal-content">
                        <span className="new-employee-modal-close" onClick={() => setShowAddingModal(false)}>X</span>
                        <h2 className="new-employee-modal-header">Yeni Çalışan Ekle</h2>
                        <input className="employee-name-input"
                            type="text"
                            name="username"
                            placeholder="Çalışan Adı"
                            value={newEmployee.username}
                            onChange={handleInputChange}
                        />
                        <input className="employee-email-input"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newEmployee.email}
                            onChange={handleInputChange}
                        />
                        <input className="new-employee-profile-pic"
                            type="file"
                            name="profilePic"
                            onChange={handleFileChange}
                        />
                        <div className="adding-modal-buttons-row">
                            <button className="adding-modal-button-create" onClick={handleSubmit}>Oluştur</button>
                            <button className="adding-modal-button-abort" onClick={() => setShowAddingModal(false)}>İptal</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default WorkersPage;
