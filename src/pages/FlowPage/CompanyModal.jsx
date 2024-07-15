// CompanyModal.jsx
import React from 'react';
import './CompanyModal.scss';

const CompanyModal = ({ isOpen, onClose, company }) => {
    if (!isOpen) return null;

    return (
        <div className="company-modal-overlay">
            <div className="company-modal">
                <button className="close-button" onClick={onClose}>X</button>
                <img
                    className="company-modal-logo"
                    src={
                        company.companyLogo && company.companyLogo.data && company.companyLogo.data.attributes && company.companyLogo.data.attributes.formats && company.companyLogo.data.attributes.formats.thumbnail
                            ? `http://localhost:1337${company.companyLogo.data.attributes.formats.thumbnail.url}`
                            : defaultLogo
                    }
                    alt="company-logo"
                />
                {console.log(company)}
                <h2 className="company-modal-name">{company?.companyName}</h2>
                <p className='company-working-area'><span className='company-areas-bold'>İş Alanı : </span>{company?.workingArea}</p>
                <p className='company-desc-area'>{company?.companyDesc}</p>
                <p className='company-desc-area'><span className='company-areas-bold'>Şirket Maili : </span>{company?.companyEmail}</p>
                <p className='company-desc-area'><span className='company-areas-bold'>Şirket Telefonu : </span>{company?.companyPhone}</p>
                {/* Diğer şirket bilgileri buraya eklenebilir */}
            </div>
        </div>
    );
};

export default CompanyModal;
