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
    const { user } = useAuth();
    const usersCompanyId = user?.company?.id;
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedJobTitle, setSelectedJobTitle] = useState('Tümü');
    const [jobTitles, setJobTitles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSearchEmployees, setFilteredSearchEmployees] = useState([]);
    const [newProfessionModalOpen, setNewProfessionModalOpen] = useState(false);
    const [filteredJobTitles, setFilteredJobTitles] = useState([]);

    const onAddProfession = async (professionName) => {
        try {
            await axios.post('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/professions', {
                data: {
                    professionName: professionName,
                    company: usersCompanyId, // Meslek şirketle ilişkilendirilecekse bu bilgiyi de ekleyin
                }
            });
            await loadJobTitles(); // Yeni meslek eklendikten sonra meslekleri yeniden yükleyin
            closeNewProfessionModal();
        } catch (error) {
            console.error("Error adding profession:", error);
        }
    };


    const loadJobTitles = async () => {
        if (!user) return; // user değişkeninin hazır olup olmadığını kontrol edin
        try {
            const response = await axios.get('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/professions?populate=*');
            const titles = response.data.data.map(item => ({
                id: item.id,
                name: item.attributes.professionName,
                companyID: item?.attributes?.company.data?.attributes?.companyID
            }));
            setJobTitles(titles);
            const filteredTitles = titles.filter(title => title?.companyID === user?.company?.companyID);
            setFilteredJobTitles(filteredTitles);
        } catch (error) {
        }
    };

    useEffect(() => {
        loadJobTitles();
    }, [user]);

    const handleJobTitleClick = (title) => {
        setSelectedJobTitle(title);
    };

    const openNewProfessionModal = () => {
        setNewProfessionModalOpen(true);
    };

    const closeNewProfessionModal = () => {
        setNewProfessionModalOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/companies/${usersCompanyId}?populate[users][populate]=profession,projects,projects.projectCoverPhoto,profilePic,groups,project_revises,company`);
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
            } catch (error) { }
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
                    <h1 className="div-big-header">Şirket Çalışanları</h1>
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
                        onAdd={onAddProfession}
                    />
                </div>
            </div>
        </div>
    );
}

export default WorkersPage;