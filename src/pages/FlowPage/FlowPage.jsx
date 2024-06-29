import "./FlowPage.scss";
import React, { useState, useEffect } from 'react';
import Navigation from "../../components/Navigation/Navigation";
import axios from "axios";
import instaLogo from "../../assets/icons/instagram-logo.png";
import linkedinLogo from "../../assets/icons/linkedin-logo.png";
import youtubeLogo from "../../assets/icons/youtube-logo.png";

function FlowPage() {
    const socialMediaAccounts = [
        {
            name: "flow",
            url: "https://www.linkedin.com/flowcompany/",
            logo: linkedinLogo
        },
        {
            name: "flow",
            url: "https://www.instagram.com/flowcompany/",
            logo: instaLogo
        },
        {
            name: "flow",
            url: "https://www.youtube.com/flowcompany/",
            logo: youtubeLogo
        },
    ];
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getCompanies() {
            try {
                const response = await axios.get('http://localhost:1337/api/companies?populate=*');
                setCompanies(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getCompanies();
    }, []);

    return (
        <div className="flow-page-main">
            <Navigation />
            <div className="flow-page-main-row">
                <div className="flow-page-main-column">
                    <h1 className="flow-page-title">Flow</h1>
                    <div className="flow-descriptions">

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Flow</span>İşinizi organize etmenize ve ekibinizle etkin bir şekilde işbirliği yapmanıza yardımcı olan, kullanımı kolay ve güçlü bir proje yönetim aracıdır. Flow sayesinde projelerinizi, dosyalarınızı ve ekip üyelerinizi tek bir platformda toplar, iş süreçlerinizi daha verimli hale getirir.</p>

                        <h2 className="flow-desc-subheader">Ana Özellikler</h2>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold"> Proje ve Görev Yönetimi</span>Projelerinizi ve görevlerinizi kolayca oluşturun, düzenleyin ve yönetin. Her görevi ayrıntılı bir şekilde tanımlayın, önceliklendirin ve zamanlayın.</p>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Ekip İşbirliği</span>Ekip üyelerinizle anlık iletişim kurun, yorum yapın ve dosya paylaşın. Ortak çalışma alanları sayesinde herkes her zaman güncel bilgilere ulaşabilir.</p>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Dosya ve Belge Yönetimi</span> Projelerinizle ilgili tüm dosyaları ve belgeleri tek bir yerde depolayın. Kolay erişim ve düzenleme imkanları ile dosya karmaşasından kurtulun.</p>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Durum Takibi</span>
                            Görevlerin ve projelerin ilerleyişini anlık olarak izleyin. Görsel gösterge panelleri sayesinde ekibinizin performansını ve proje durumunu kolayca takip edin.</p>

                        <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Esnek ve Kullanıcı Dostu</span> Flow, kullanıcı dostu arayüzü ile herkesin kolayca adapte olabileceği bir yapıya sahiptir. Ayrıca, farklı sektörlere ve çalışma tarzlarına uyum sağlayacak şekilde özelleştirilebilir.</p>
                    </div>
                </div>
                <div className="all-companies-column">
                    <h2 className="all-companies-page-title">Tüm Şirketler</h2>
                    <div className="flow-page-row">
                        {companies.map((company) => (
                            <div key={company.id} className="all-companies-page-company-card">
                                <h2 className="company-hub-header">{company.attributes.companyName}</h2>
                                <img className="company-hub-one-logo" src={`http://localhost:1337${company.attributes.companyLogo.data.attributes.formats.thumbnail.url}`} alt="company-logo" srcSet="" />
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
        </div>
    );
}
export default FlowPage;
