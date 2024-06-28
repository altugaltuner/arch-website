import React, { useState, useEffect } from 'react';
import './CompanyGridSidebar.scss';
import NewProfessionModal from '../NewProfessionModal/NewProfessionModal';
import axios from 'axios';

function CompanyGridSidebar({ selectedJobTitle, handleJobTitleClick }) {
    const [jobTitles, setJobTitles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadJobTitles = async () => {
        try {
            const response = await axios.get('http://localhost:1337/api/professions?populate=*');
            const titles = response.data.data.map(item => item.attributes.professionName);
            setJobTitles(titles);
        } catch (error) {
            console.error('Meslek türleri yüklenemedi:', error);
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

    return (
        <div className="company-grid-sidebar">
            <ul>
                <li className='job-titles-for-workersPage' onClick={openNewProfessionModal}>Meslek Türü Ekle</li>
                <li
                    className={`job-titles-for-workersPage ${selectedJobTitle === "Tümü" ? 'active' : ''}`}
                    onClick={() => handleJobTitleClick('Tümü')}
                >
                    Tümü
                </li>
                {jobTitles.map((title, index) => (
                    <li
                        className={`job-titles-for-workersPage ${selectedJobTitle === title ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleJobTitleClick(title)}
                        role="button"
                    >
                        {title}
                    </li>
                ))}
            </ul>
            <NewProfessionModal isOpen={isModalOpen} onClose={closeNewProfessionModal} onAdd={handleAddProfession} />
        </div>
    );
}

export default CompanyGridSidebar;
