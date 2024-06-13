import React, { useState, useEffect } from "react";
import "./WorkersPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import axios from 'axios';
import GroupMessagePanel from "../../components/GroupMessagePanel/GroupMessagePanel";

function WorkersPage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState('Tümü');
    const [jobTitles, setJobTitles] = useState([]);

    const sendEmail = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const handleJobTitleClick = (title) => {
        setSelectedJobTitle(title);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=profession,projects,profilePic');
                console.log(response.data);
                setEmployees(response.data);
                const titles = response.data.map(employee => employee.profession.professionName);
                const uniqueTitles = Array.from(new Set(titles));
                setJobTitles(uniqueTitles);

            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    const openEmployeeCardModal = (employee) => {
        setSelectedEmployee(employee);
    };

    const closeEmployeeCardModal = () => {
        setSelectedEmployee(null);
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
                <div className="employee-private-chat">
                    <GroupMessagePanel />
                </div>
                <div className="employee-grid">
                    {filteredEmployees.map((employee, index) => (
                        <div className="employee-card" key={index} onClick={() => openEmployeeCardModal(employee)}>
                            <div className="profile-pic">
                                <img className="profile-pic-inner" src={employee.profilePic ? `http://localhost:1337${employee.profilePic.url}` : ""} alt="" srcSet="" />
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
                                <img className="profile-pic-inner" src={`http://localhost:1337${selectedEmployee.profilePic?.url || ""}`} alt="" srcSet="" />
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
        </div>
    );
}

export default WorkersPage;
