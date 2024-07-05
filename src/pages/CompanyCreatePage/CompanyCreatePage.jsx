// CompanyCreatePage.jsx
import React, { useState } from "react";
import "./CompanyCreatePage.scss";
import CompanyFormElements from "../../components/CompanyFormElements/CompanyFormElements";
import backButton from "../../assets/icons/back-button.png";

function CompanyCreatePage() {
    const [errors, setErrors] = useState({});

    return (
        <main className="company-create-page-main">
            <img className="back-button-company" src={backButton} alt="back-button" onClick={() => window.history.back()} />
            <h1 className="company-create-page-title">Şirket Hesabı Açın</h1>
            <div className="company-and-admin-create-div">
                <CompanyFormElements errors={errors} setErrors={setErrors} />
            </div>
        </main>
    );
};

export default CompanyCreatePage;
