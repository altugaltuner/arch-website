import React, { useState, useEffect } from 'react';
import './CompanyGridSidebar.scss';
import NewProfessionModal from '../NewProfessionModal/NewProfessionModal';
import DeleteModal from '../DeleteProfessionModal/DeleteProfessionModal';
import axios from 'axios';
import deleteIcon from '../../assets/icons/delete-icon.png';
import { useAuth } from "../../components/AuthProvider";

const CACHE_DURATION = 15 * 60 * 1000;

function CompanyGridSidebar({ selectedJobTitle, handleJobTitleClick }) {
    const [jobTitles, setJobTitles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [jobTitleToDelete, setJobTitleToDelete] = useState(null);
    const [filteredJobTitles, setFilteredJobTitles] = useState([]);

    const { user } = useAuth();
    const userRole = user && user.access ? user.access.role : null;

    const loadJobTitles = async () => {

        const cachedJobTitles = localStorage.getItem(`cachedJobTitles`);
        const cachedTimestampJobTitles = localStorage.getItem(`jobTitles_timestamp`);

        if (cachedJobTitles && cachedTimestampJobTitles) {
            const age = Date.now() - parseInt(cachedTimestampJobTitles, 10);
            if (age < CACHE_DURATION) {
                setJobTitles(JSON.parse(cachedJobTitles));
                return;
            }
        }

        try {
            const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/professions?populate=*');
            const titles = response.data.data.map(item => ({
                id: item.id,
                name: item.attributes.professionName,
                companyID: item.attributes.company.data.attributes.companyID
            }));
            setJobTitles(titles);
            const filteredTitles = titles.filter(title => title.companyID === user.company.companyID);
            setFilteredJobTitles(filteredTitles);

            localStorage.setItem(`cachedJobTitles`, JSON.stringify(filteredTitles));
            localStorage.setItem(`jobTitles_timestamp`, Date.now().toString());

        } catch (error) {
        }
    };


    useEffect(() => {
        loadJobTitles();
    }, []);

    const openNewProfessionModal = () => {
        setIsModalOpen(true);
    };

    const closeNewProfessionModal = () => {
        setIsModalOpen(false);
    };

    const handleAddProfession = () => {
        loadJobTitles();
        closeNewProfessionModal();
    };

    const openDeleteModal = (title) => {
        setJobTitleToDelete(title);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setJobTitleToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleDeleteProfession = async () => {
        if (jobTitleToDelete) {
            try {
                await axios.delete(`https://bold-animal-facf707bd9.strapiapp.com/api/professions/${jobTitleToDelete.id}`);
                setJobTitles(prevTitles => prevTitles.filter(title => title.id !== jobTitleToDelete.id));
                closeDeleteModal();
            } catch (error) {
            }
        }
    };

    return (
        <div className="company-grid-sidebar">
            <ul>
                {userRole === "Admin" && (

                    <li className='job-titles-for-workersPage' onClick={openNewProfessionModal}>Meslek Türü Ekle</li>
                )}
                <li
                    className={`job-titles-for-workersPage ${selectedJobTitle === "Tümü" ? 'active' : ''}`}
                    onClick={() => handleJobTitleClick('Tümü')}
                >
                    Tümü
                </li>
                {filteredJobTitles.map((title, index) => (
                    <li
                        className={`job-titles-for-workersPage ${selectedJobTitle === title.name ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleJobTitleClick(title.name)}
                        role="button"
                    >
                        {userRole === "Admin" && (
                            <img
                                src={deleteIcon}
                                alt="Delete"
                                className="trash-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openDeleteModal(title);
                                }}
                            />
                        )}
                        <p className='job-titles-for-title-name'>{title.name}</p>

                    </li>
                ))}
            </ul>
            <NewProfessionModal isOpen={isModalOpen} onClose={closeNewProfessionModal} onAdd={handleAddProfession} />
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onDelete={handleDeleteProfession}
            />
        </div>
    );
}

export default CompanyGridSidebar;
