import React from 'react';
import './CompanyGridSidebar.scss';

function CompanyGridSidebar({ jobTitles, selectedJobTitle, handleJobTitleClick, openNewProfessionModal }) {
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
        </div>
    );
}

export default CompanyGridSidebar;
