import axios from "axios";
import { useEffect, useState } from "react";
import "./FirstPage.scss";
import flowLogo from "../../assets/icons/flow-logo.png"

function FirstPage() {


    return (
        <main className="firstpage-main">
            <div className="firstpage-div">
                <img className="firstpage-logo" src={flowLogo} alt="flow-logo" />
                <h1 className="firstpage-header">Flow</h1>
                <h2 className="firstpage-title">Flow, işinizi organize etmenize ve ekibinizle işbirliği yapmanıza yardımcı olan bir proje yönetim aracıdır. Kullanabilmek için lütfen iş sahibi veya çalışan olarak kaydolun.</h2>
                <div className="firstpage-buttons-div">
                    <button className="employee-create-btn" >Çalışan Hesabı Aç</button>
                    <button className="owner-create-btn">Şirket Hesabı Aç</button>
                </div>
            </div>
        </main>
    );
}

export default FirstPage;
