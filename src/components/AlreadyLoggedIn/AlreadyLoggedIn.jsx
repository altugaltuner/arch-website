import React from 'react';
import './AlreadyLoggedIn.scss';

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
                    <button className="already-login-back" onClick={() => window.history.back()}>
                        Geri Dön
                    </button>
                </div>
            </div>
        </main>
    );
}

export default AlreadyLoggedIn;
