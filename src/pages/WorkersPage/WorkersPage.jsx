import React, { useState, useEffect } from "react";
import "./WorkersPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import axios from 'axios';
import GroupMessagePanel from "../../components/GroupMessagePanel/GroupMessagePanel";
import SelectedEmployeeModal from "../../components/SelectedEmployeeModal/SelectedEmployeeModal";
import EmployeeGrid from "../../components/EmployeeGrid/EmployeeGrid";
import CompanyGridSidebar from "../../components/CompanyGridSidebar/CompanyGridSidebar"

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
                <CompanyGridSidebar
                    jobTitles={jobTitles}
                    selectedJobTitle={selectedJobTitle}
                    handleJobTitleClick={handleJobTitleClick}
                />
                <div className="employee-private-chat">
                    <GroupMessagePanel />
                </div>
                <EmployeeGrid
                    employees={filteredEmployees}
                    openEmployeeCardModal={openEmployeeCardModal}
                />
                <SelectedEmployeeModal
                    employee={selectedEmployee}
                    onClose={closeEmployeeCardModal}
                    sendEmail={sendEmail}
                />
            </div>
        </div>
    );
}

export default WorkersPage;
