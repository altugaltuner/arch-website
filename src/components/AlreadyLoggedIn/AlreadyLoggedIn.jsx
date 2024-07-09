import React from 'react';
import './AlreadyLoggedIn.scss';
import { Link } from 'react-router-dom';

function AlreadyLoggedIn() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <main className="already-login-main">
            <div className="already-login-main-div">
                <h1 className="already-login-header">Çıkmak İstediğinize Emin Misiniz ?</h1>
                <div className='already-login-btn-div'>
                    <button className="already-login-logout" onClick={handleLogout}>
                        Çıkış Yap
                    </button>
                    <Link to="/homepage" className="already-login-back">Anasayfaya Dön</Link>
                </div>
            </div>
        </main>
    );
}

export default AlreadyLoggedIn;
