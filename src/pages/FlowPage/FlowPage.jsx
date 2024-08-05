import React, { useState, useEffect } from 'react';
import "./FlowPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import axios from "axios";
import instaLogo from "../../assets/icons/instagram-logo.png";
import linkedinLogo from "../../assets/icons/linkedin-logo.png";
import youtubeLogo from "../../assets/icons/youtube-logo.png";
import defaultLogo from "../../assets/icons/groups-logo.png";
import CompanyModal from "./CompanyModal";

const CACHE_DURATION = 15 * 60 * 1000; // 15 dakika

function FlowPage() {
    const socialMediaAccounts = [
        {
            name: "ofisim",
            url: "https://www.linkedin.com/ofisimcompany/",
            logo: linkedinLogo
        },
        {
            name: "ofisim",
            url: "https://www.instagram.com/ofisimcompany/",
            logo: instaLogo
        },
        {
            name: "ofisim",
            url: "https://www.youtube.com/ofisimcompany/",
            logo: youtubeLogo
        },
    ];
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function getCompanies() {

            const cachedCompanies = localStorage.getItem(`cachedCompanies`);
            const cachedTimestampCompanies = localStorage.getItem(`companies_timestamp`);

            if (cachedCompanies && cachedTimestampCompanies) {
                const age = Date.now() - parseInt(cachedTimestampCompanies, 10);
                if (age < CACHE_DURATION) {
                    console.log('Veriler localStorage\'dan yükleniyor');
                    setCompanies(JSON.parse(cachedCompanies));
                    return;
                }
            }
            try {
                const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/companies?populate=*');
                setCompanies(response.data.data);
                localStorage.setItem(`cachedCompanies`, JSON.stringify(response.data.data));
                localStorage.setItem(`companies_timestamp`, Date.now().toString());
            } catch (error) {
                console.error(error);
            }
        }
        getCompanies();
    }, []);

    const handleCompanyClick = (company) => {
        setSelectedCompany(company.attributes);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCompany(null);
    };

    return (
        <div className="flow-page-main">
            <Navigation />
            <div className="flow-page-main-column">
                <h1 className="div-big-header">Ofisim</h1>
                <div className="all-companies-column">
                    <h2 className="all-companies-page-title">Tüm Şirketler</h2>
                    <div className="flow-page-row">
                        {companies.map((company) => (
                            <div
                                key={company.id}
                                className="all-companies-page-company-card"
                                onClick={() => handleCompanyClick(company)}
                            >
                                <h2 className="company-hub-header">{company.attributes.companyName}</h2>
                                <img
                                    className="company-hub-one-logo"
                                    src={
                                        company.attributes.companyLogo && company.attributes.companyLogo.data && company.attributes.companyLogo.data.attributes && company.attributes.companyLogo.data.attributes.formats && company.attributes.companyLogo.data.attributes.formats.thumbnail
                                            ? company.attributes.companyLogo.data.attributes.formats.thumbnail.url
                                            : defaultLogo
                                    }
                                    alt="company-logo"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="social-media-and-connections">
                        <h2 className="firstpage-social-media-header">Bizi Takip Edin</h2>
                        <div className="social-media-logo-div">
                            {socialMediaAccounts.map((account, index) => (
                                <a key={index} className="social-media-a" href={account.url} target="_blank" rel="noreferrer">
                                    <div className="social-img-p">
                                        <img className="social-media-logo" src={account.logo} alt={account.name} />
                                        <p className="social-media-title">{account.name}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <CompanyModal isOpen={isModalOpen} onClose={closeModal} company={selectedCompany} />
        </div>
    );
}

export default FlowPage;
