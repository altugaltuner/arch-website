import "./FirstPage.scss";
import flowLogo from "../../assets/icons/flow-logo.png";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import instaLogo from "../../assets/icons/instagram-logo.png";
import linkedinLogo from "../../assets/icons/linkedin-logo.png";
import emailLogo from "../../assets/icons/email-logo.png";
import youtubeLogo from "../../assets/icons/youtube-logo.png";

function FirstPage() {

    const isLogin = Cookies.get("isLogin")
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
        {
            name: "flow",
            url: "https://www.email.com/flowcompany/",
            logo: emailLogo
        }
    ];

    return (
        <main className="firstpage-main">
            <div className="firstpage-div">
                <img className="firstpage-logo" src={flowLogo} alt="flow-logo" />
                <h1 className="firstpage-header">Flow</h1>
                <h2 className="firstpage-title">Flow, işinizi organize etmenize ve ekibinizle işbirliği yapmanıza yardımcı olan bir proje yönetim aracıdır. Kullanabilmek için lütfen iş sahibi veya çalışan olarak kaydolun.</h2>
                <div className="firstpage-buttons-div">
                    <Link to="/signup" className="employee-create-btn">Çalışan Hesabı Aç</Link>
                    {isLogin ? <Link to="/homepage" className="employee-login-btn">Ana Sayfaya Dön</Link> : <Link to="/login" className="employee-login-btn">Hesabınız mı var? Giriş Yapın</Link>}
                    <Link to="/company-create" className="owner-create-btn">Şirket Hesabı Aç</Link>
                </div>
            </div>
            <div className="firstpage-social-media">
                <h2 className="firstpage-social-media-header">Bizi Takip Edin</h2>
                <div className="social-media-logo-div">
                    {socialMediaAccounts.map((account, index) => (
                        <a key={index} className="social-media-a" href={account.url} target="_blank" rel="noreferrer">
                            <img className="social-media-logo" src={account.logo} alt={account.name} />
                            <p className="social-media-title">{account.name}</p>
                        </a>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default FirstPage;
