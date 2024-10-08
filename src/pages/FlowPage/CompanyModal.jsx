import React from 'react';
import './CompanyModal.scss';
import defaultLogo from "../../assets/icons/groups-logo.png";

const CompanyModal = ({ isOpen, onClose, company }) => {
    if (!isOpen) return null;

    return (
        <div className="company-modal-overlay">
            <div className="company-modal">
                <button className="global-close-button" onClick={onClose}>X</button>
                <img
                    className="company-modal-logo"
                    src={
                        company.companyLogo && company.companyLogo.data && company.companyLogo.data.attributes && company.companyLogo.data.attributes.formats && company.companyLogo.data.attributes.formats.thumbnail
                            ? company.companyLogo.data.attributes.formats.thumbnail.url
                            : defaultLogo
                    }
                    alt="company-logo"
                />
                <h2 className="modal-header">{company?.companyName}</h2>
                <p className='company-working-area'><span className='company-areas-bold'>İş Alanı : </span>{company?.workingArea}</p>
                <p className='company-desc-area'><span className='company-areas-bold'>Şirket Açıklaması : </span>{company?.companyDesc || "Yok"}</p>
                <p className='company-desc-area'><span className='company-areas-bold'>Şirket Maili : </span>{company?.companyEmail || "Yok"}</p>
                <p className='company-desc-area'><span className='company-areas-bold'>Şirket Telefonu : </span>{company?.companyPhone || "Yok"}</p>
            </div>
        </div>
    );
};

export default CompanyModal;
