import "./FirstPage.scss";
import ofisimLogo from "../../assets/icons/ofisim-logo.png";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import instaLogo from "../../assets/icons/instagram-logo.png";
import linkedinLogo from "../../assets/icons/linkedin-logo.png";
import emailLogo from "../../assets/icons/email-logo.png";
import youtubeLogo from "../../assets/icons/youtube-logo.png";
import { useEffect } from "react";

function FirstPage() {
    let isLogin = "";

    useEffect(() => {
        isLogin = Cookies.get("isLogin")
    }, []);

    // const socialMediaAccounts = [
    //     {
    //         name: "ofisim",
    //         url: "https://www.linkedin.com/ofisimcompany/",
    //         logo: linkedinLogo
    //     },
    //     {
    //         name: "ofisim",
    //         url: "https://www.instagram.com/ofisimcompany/",
    //         logo: instaLogo
    //     },
    //     {
    //         name: "ofisim",
    //         url: "https://www.youtube.com/ofisimcompany/",
    //         logo: youtubeLogo
    //     },
    //     {
    //         name: "ofisim",
    //         url: "https://www.email.com/ofisimcompany/",
    //         logo: emailLogo
    //     }
    // ];

    return (
        <main className="firstpage-main">
            <div className="firstpage-div">
                <img className="firstpage-logo" src={ofisimLogo} alt="ofisim-logo" />
                <h1 className="firstpage-header">Ofisim</h1>
            </div>
            <div className="flow-descriptions">
                <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Ofisim Nedir</span>İşinizi organize etmenize ve ekibinizle etkin bir şekilde işbirliği yapmanıza yardımcı olan, kullanımı kolay ve güçlü bir proje yönetim aracıdır.</p>

                <p className="flow-desc-paragraph"><span className="flow-desc-p-bold"> Proje ve Görev Yönetimi</span>Projelerinizi ve görevlerinizi kolayca oluşturun, düzenleyin ve yönetin. <br /><br />Her görevi ayrıntılı bir şekilde tanımlayın, önceliklendirin ve zamanlayın.</p>

                <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Ekip İşbirliği</span>Ekip üyelerinizle anlık iletişim kurun, yorum yapın ve dosya paylaşın.<br /><br /> Ortak çalışma alanları sayesinde herkes her zaman güncel bilgilere ulaşabilir.</p>

                <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Dosya ve Belge Yönetimi</span> Projelerinizle ilgili tüm dosyaları ve belgeleri tek bir yerde depolayın.<br /><br /> Kolay erişim ve düzenleme imkanları ile dosya karmaşasından kurtulun.</p>

                <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Durum Takibi</span>
                    Görevlerin ve projelerin ilerleyişini anlık olarak izleyin.<br /><br /> Görsel gösterge panelleri sayesinde ekibinizin performansını ve proje durumunu kolayca takip edin.</p>

                <p className="flow-desc-paragraph"><span className="flow-desc-p-bold">Esnek ve Kullanıcı Dostu</span> Ofisim, kullanıcı dostu arayüzü ile herkesin kolayca adapte olabileceği bir yapıya sahiptir.<br /><br /> Ayrıca, farklı sektörlere ve çalışma tarzlarına uyum sağlayacak şekilde özelleştirilebilir.</p>
            </div>
            <div className="firstpage-buttons-div">
                <Link to="/signup" className="employee-create-btn">Çalışan Hesabı Aç</Link>
                {isLogin ? <Link to="/homepage" className="employee-login-btn">Ana Sayfaya Dön</Link> : <Link to="/login" className="employee-login-btn">Hesabınız mı var? Giriş Yapın</Link>}
                <Link to="/company-create" className="owner-create-btn">Şirket Hesabı Aç</Link>
            </div>
            {/* <div className="firstpage-social-media">
                <h2 className="firstpage-social-media-header">Bizi Takip Edin</h2>
                <div className="social-media-logo-div">
                    {socialMediaAccounts.map((account, index) => (
                        <a key={index} className="social-media-a" href={account.url} target="_blank" rel="noreferrer">
                            <img className="social-media-logo" src={account.logo} alt={account.name} />
                            <p className="social-media-title">{account.name}</p>
                        </a>
                    ))}
                </div>
            </div> */}
        </main>
    );
}

export default FirstPage;
