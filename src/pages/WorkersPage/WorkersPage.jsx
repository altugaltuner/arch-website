import React, { useState } from "react";
import "./WorkersPage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";

import employees from "../../database/employees";
import jobTitles from "../../database/jobTitles";

function WorkersPage() {
    const auth = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState('Tümü');

    function openEmployeeCardModal(employee) {
        setSelectedEmployee(employee);
    }

    function closeEmployeeCardModal() {
        setSelectedEmployee(null);
    }

    function handleJobTitleClick(title) {
        setSelectedJobTitle(title);
    }

    const filteredEmployees = selectedJobTitle === 'Tümü'
        ? employees
        : employees.filter(employee => employee.title === selectedJobTitle);

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
                        {jobTitles.map((item, index) => (
                            <li
                                className="job-titles-for-workersPage"
                                key={item.id}
                                onClick={() => handleJobTitleClick(item.title)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="employee-grid">
                    {filteredEmployees.map((employee, index) => (
                        <div className="employee-card" key={index} onClick={() => openEmployeeCardModal(employee)}>
                            <div className="profile-pic"></div>
                            <div className="employee-info">
                                <h3>{employee.name}</h3>
                                <p>{employee.title}</p>
                                <p>{employee.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedEmployee && (
                    <div className="employee-card-modal">
                        <div className="employee-card-modal-inner">
                            <p>{selectedEmployee.name}</p>
                            <p>{selectedEmployee.title}</p>
                            <p>{selectedEmployee.email}</p>
                            <button className="modal-close-btn" onClick={closeEmployeeCardModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkersPage;
