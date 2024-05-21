import React, { useState, useEffect } from "react";
import "./WorkersPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import jobTitles from "../../database/jobTitles";
import axios from 'axios';

function WorkersPage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState('Tümü');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/employees?populate=profession,projects,profilePic');
                console.log(response.data); // Yanıtı kontrol etmek için konsola yazdırın
                setEmployees(response.data.data); // API'nin döndürdüğü veriyi kontrol edin ve uygun şekilde kaydedin
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

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
        : employees.filter(employee => employee.attributes.profession.data.attributes.professionName === selectedJobTitle);

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
                        {jobTitles.map((item) => (
                            <li
                                className="job-titles-for-workersPage"
                                key={item.id}
                                onClick={() => handleJobTitleClick(item.name)}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="employee-grid">
                    {filteredEmployees.map((employee, index) => (
                        <div className="employee-card" key={index} onClick={() => openEmployeeCardModal(employee)}>
                            <div className="profile-pic">
                                <img className="profile-pic-inner" src={`http://localhost:1337${employee.attributes.profilePic.data.attributes.url}`} alt="" srcSet="" />
                            </div>
                            <div className="employee-info">
                                <h3>{employee.attributes.fullname}</h3>
                                <p>{employee.attributes.jobTitle}</p>
                                <p>{employee.attributes.email}</p>
                                <p>{employee.attributes.profession.data.attributes.professionName}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedEmployee && (
                    <div className="employee-card-modal">
                        <div className="employee-card-modal-inner">
                            <div className="profile-pic">
                                <img className="profile-pic-inner" src={`http://localhost:1337${selectedEmployee.attributes.profilePic.data.attributes.url}`} alt="" srcSet="" />
                            </div>
                            <p>{selectedEmployee.attributes.fullname}</p>
                            <p>{selectedEmployee.attributes.jobTitle}</p>
                            <p>{selectedEmployee.attributes.email}</p>
                            <button className="modal-close-btn" onClick={closeEmployeeCardModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkersPage;
