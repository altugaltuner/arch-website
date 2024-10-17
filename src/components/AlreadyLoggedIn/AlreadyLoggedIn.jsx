import React from 'react';
import './AlreadyLoggedIn.scss';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import backButton from '../../assets/icons/back-button.png';

function AlreadyLoggedIn() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
        Cookies.set("isLogin", "false")
    };

    return (
        <main className="already-login-main">
            <div className="already-login-main-div">
                <h1 className="already-login-header">Çıkmak İstediğinize Emin Misiniz ?</h1>
                <div className='already-login-btn-div'>
                    <button className="already-login-logout" onClick={handleLogout}>
                        Çıkış Yap
                    </button>
                    <Link to="/projects" className="already-login-back">Anasayfaya Dön</Link>
                </div>
            </div>
            <img className="back-button-already" src={backButton} alt="back-button" onClick={() => window.history.back()} />
        </main>
    );
}

export default AlreadyLoggedIn;
