import React from "react";
import "./NotFoundPage.scss";

function NotFoundPage() {

    const turnBack = () => {
        window.history.back();
    };

    return (
        <main className="not-found-main">
            <h1 className="not-found-header">Aradığınız sayfa bulunamadı.</h1>
            <button className="not-found-turnback-btn" onClick={turnBack}>Geri Dön</button>
        </main>
    );
}

export default NotFoundPage;
