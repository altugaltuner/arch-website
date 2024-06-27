import React, { useState, useEffect } from "react";
import "./WorkersPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import axios from 'axios';
import OtherUsersInfo from "../../components/OtherUsersInfo/OtherUsersInfo";
// import SelectedEmployeeModal from "../../components/SelectedEmployeeModal/SelectedEmployeeModal";
import EmployeeGrid from "../../components/EmployeeGrid/EmployeeGrid";
import CompanyGridSidebar from "../../components/CompanyGridSidebar/CompanyGridSidebar";

function WorkersPage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState('Tümü');
    const [jobTitles, setJobTitles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSearchEmployees, setFilteredSearchEmployees] = useState([]);

    const sendEmail = (email) => {
        window.location.href = `mailto:${email}`;
    };

    const handleJobTitleClick = (title) => {
        setSelectedJobTitle(title);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=profession,projects,projects.projectCoverPhoto,profilePic,groups,project_revises');
                console.log(response.data); // Check data structure
                setEmployees(response.data);
                setFilteredSearchEmployees(response.data);
                const titles = response.data.map(employee => employee.profession.professionName);
                const uniqueTitles = Array.from(new Set(titles));
                setJobTitles(uniqueTitles);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const results = employees.filter(employee =>
            employee.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSearchEmployees(results);
    }, [searchTerm, employees]);

    const searchEmployees = (event) => {
        setSearchTerm(event.target.value);
    };

    const openEmployeeCardModal = (employee) => {
        console.log("Employee selected:", employee); // Debug selected employee
        setSelectedEmployee(employee);
    };

    const closeEmployeeCardModal = () => {
        setSelectedEmployee(null);
    };

    const filteredEmployees = selectedJobTitle === 'Tümü'
        ? filteredSearchEmployees
        : filteredSearchEmployees.filter(employee => employee.profession.professionName === selectedJobTitle);

    return (
        <div className="workers-page-main">
            <Navigation />
            <div className="workers-column">
                <div className="workers-row">
                    <h1 className="workers-page-header">Şirket Çalışanları</h1>
                    <input
                        onChange={searchEmployees}
                        value={searchTerm}
                        className="search-bar-of-projects"
                        type="text"
                        placeholder="Çalışan Ara"
                    />
                </div>
                <div className="company-grid">
                    <CompanyGridSidebar
                        jobTitles={jobTitles}
                        selectedJobTitle={selectedJobTitle}
                        handleJobTitleClick={handleJobTitleClick}
                    />
                    <div className="user-permission-settings">
                        <OtherUsersInfo
                            employee={selectedEmployee}
                            onClose={closeEmployeeCardModal}
                            sendEmail={sendEmail}
                        />
                    </div>
                    <EmployeeGrid
                        employees={filteredEmployees}
                        openEmployeeCardModal={openEmployeeCardModal}
                    />
                </div>
            </div>
        </div>
    );
}

export default WorkersPage;
