import React from 'react';

function AlreadyLoggedIn() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <main className="login-main">
            <div className="login-main-div">
                <h1 className="login-h1">Çıkmak İçin Tıklayın</h1>
                <button className="login-logout" onClick={handleLogout}>
                    Çıkış Yap
                </button>
            </div>
        </main>
    );
}

export default AlreadyLoggedIn;
