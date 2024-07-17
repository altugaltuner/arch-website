// FlowPage.jsx
import React, { useState, useEffect } from 'react';
import "./FlowPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import axios from "axios";
import instaLogo from "../../assets/icons/instagram-logo.png";
import linkedinLogo from "../../assets/icons/linkedin-logo.png";
import youtubeLogo from "../../assets/icons/youtube-logo.png";
import defaultLogo from "../../assets/icons/groups-logo.png";
import CompanyModal from "./CompanyModal";

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
            try {
                const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/companies?populate=*');
                setCompanies(response.data.data);
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
            <div className="flow-page-main-row">
                <div className="flow-page-main-column">
                    <h1 className="flow-page-title">Ofisim</h1>
                    <div className="flow-descriptions">
                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Ofisim</span>İşinizi organize etmenize ve ekibinizle etkin bir şekilde işbirliği yapmanıza yardımcı olan, kullanımı kolay ve güçlü bir proje yönetim aracıdır. Ofisim sayesinde projelerinizi, dosyalarınızı ve ekip üyelerinizi tek bir platformda toplar, iş süreçlerinizi daha verimli hale getirir.</p>

                        <h2 className="flow-desc-subheader">Ana Özellikler</h2>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold"> Proje ve Görev Yönetimi</span>Projelerinizi ve görevlerinizi kolayca oluşturun, düzenleyin ve yönetin. Her görevi ayrıntılı bir şekilde tanımlayın, önceliklendirin ve zamanlayın.</p>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Ekip İşbirliği</span>Ekip üyelerinizle anlık iletişim kurun, yorum yapın ve dosya paylaşın. Ortak çalışma alanları sayesinde herkes her zaman güncel bilgilere ulaşabilir.</p>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Dosya ve Belge Yönetimi</span> Projelerinizle ilgili tüm dosyaları ve belgeleri tek bir yerde depolayın. Kolay erişim ve düzenleme imkanları ile dosya karmaşasından kurtulun.</p>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Durum Takibi</span>
                            Görevlerin ve projelerin ilerleyişini anlık olarak izleyin. Görsel gösterge panelleri sayesinde ekibinizin performansını ve proje durumunu kolayca takip edin.</p>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Esnek ve Kullanıcı Dostu</span> Ofisim, kullanıcı dostu arayüzü ile herkesin kolayca adapte olabileceği bir yapıya sahiptir. Ayrıca, farklı sektörlere ve çalışma tarzlarına uyum sağlayacak şekilde özelleştirilebilir.</p>
                    </div>
                </div>
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
                                            ? `https://bold-animal-facf707bd9.strapiapp.com${company.attributes.companyLogo.data.attributes.formats.thumbnail.url}`
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
