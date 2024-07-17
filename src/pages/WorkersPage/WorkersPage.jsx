import React, { useState, useEffect } from "react";
import "./WorkersPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import axios from 'axios';
import OtherUsersInfo from "../../components/OtherUsersInfo/OtherUsersInfo";
import EmployeeGrid from "../../components/EmployeeGrid/EmployeeGrid";
import CompanyGridSidebar from "../../components/CompanyGridSidebar/CompanyGridSidebar";
import NewProfessionModal from "../../components/NewProfessionModal/NewProfessionModal";
import { useAuth } from "../../components/AuthProvider";

function WorkersPage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState('Tümü');
    const [jobTitles, setJobTitles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSearchEmployees, setFilteredSearchEmployees] = useState([]);

    const [newProfessionModalOpen, setNewProfessionModalOpen] = useState(false);

    const handleJobTitleClick = (title) => {
        setSelectedJobTitle(title);
    };

    const openNewProfessionModal = () => {
        setNewProfessionModalOpen(true);
    };

    const closeNewProfessionModal = () => {
        setNewProfessionModalOpen(false);
    };

    const { user } = useAuth();

    const usersCompanyId = user?.company?.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/companies/${usersCompanyId}?populate[users][populate]=profession,projects,projects.projectCoverPhoto,profilePic,groups,project_revises`);
                const companyUsers = response.data.data.attributes.users.data;
                const formattedUsers = companyUsers.map(user => ({
                    ...user.attributes,
                    id: user.id
                }));
                setEmployees(formattedUsers);
                setFilteredSearchEmployees(formattedUsers);
                const titles = formattedUsers.map(employee => employee.profession.professionName);
                const uniqueTitles = Array.from(new Set(titles));
                setJobTitles(uniqueTitles);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, [usersCompanyId]);

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
        setSelectedEmployee(employee);
    };

    const closeEmployeeCardModal = () => {
        setSelectedEmployee(null);
    };

    const filteredEmployees = selectedJobTitle === 'Tümü'
        ? filteredSearchEmployees
        : filteredSearchEmployees.filter(employee => employee?.profession?.data?.attributes?.professionName === selectedJobTitle);

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
                        openNewProfessionModal={openNewProfessionModal}
                    />
                    <div className="user-permission-settings">
                        <OtherUsersInfo
                            employee={selectedEmployee}
                            onClose={closeEmployeeCardModal}
                        />
                    </div>
                    <EmployeeGrid
                        employees={filteredEmployees}
                        openEmployeeCardModal={openEmployeeCardModal}
                    />
                    <NewProfessionModal
                        isOpen={newProfessionModalOpen}
                        onClose={closeNewProfessionModal}
                    />
                </div>
            </div>
        </div>
    );
}

export default WorkersPage;