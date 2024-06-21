import { useEffect, useState } from "react";
import "./FirstPage.scss";
import flowLogo from "../../assets/icons/flow-logo.png";
import { Link } from 'react-router-dom';

import instaLogo from "../../assets/icons/instagram-logo.png";
import linkedinLogo from "../../assets/icons/linkedin-logo.png";
import emailLogo from "../../assets/icons/email-logo.png";
import youtubeLogo from "../../assets/icons/youtube-logo.png";

function FirstPage() {

    return (
        <main className="firstpage-main">
            <div className="firstpage-div">
                <img className="firstpage-logo" src={flowLogo} alt="flow-logo" />
                <h1 className="firstpage-header">Flow</h1>
                <h2 className="firstpage-title">Flow, işinizi organize etmenize ve ekibinizle işbirliği yapmanıza yardımcı olan bir proje yönetim aracıdır. Kullanabilmek için lütfen iş sahibi veya çalışan olarak kaydolun.</h2>
                <div className="firstpage-buttons-div">
                    <Link to="/signup" className="employee-create-btn" >Çalışan Hesabı Aç</Link>
                    <Link to="/login" className="employee-login-btn">Hesabınız mı var? Giriş Yapın</Link>
                    <Link to="/company-create" className="owner-create-btn">Şirket Hesabı Aç</Link>
                </div>
            </div>
            <div className="firstpage-social-media">
                <h2 className="firstpage-social-media-header">Bizi Takip Edin</h2>
                <div className="social-media-logo-div">
                    <a className="social-media-a" href="https://www.linkedin.com/sdfssg/" target="_blank" rel="noreferrer">
                        <img className="social-media-logo" src={linkedinLogo} alt="" srcSet="" />
                        <p className="social-media-title">flow</p>
                    </a>
                    <a className="social-media-a" href="https://www.instagram.com/sdfssg/" target="_blank" rel="noreferrer">
                        <img className="social-media-logo" src={instaLogo} alt="" srcSet="" />
                        <p className="social-media-title">flow</p>
                    </a>
                    <a className="social-media-a" href="https://www.youtube.com/sdfssg/" target="_blank" rel="noreferrer">
                        <img className="social-media-logo" src={youtubeLogo} alt="" srcSet="" />
                        <p className="social-media-title">flow</p>
                    </a>
                    <a className="social-media-a" href="https://www.email.com/sdfssg/" target="_blank" rel="noreferrer">
                        <img className="social-media-logo" src={emailLogo} alt="" srcSet="" />
                        <p className="social-media-title">flow</p>
                    </a>
                </div>
            </div>
        </main>
    );
}

export default FirstPage;
