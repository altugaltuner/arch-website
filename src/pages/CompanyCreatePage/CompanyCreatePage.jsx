// CompanyCreatePage.jsx
import React, { useState } from "react";
import "./CompanyCreatePage.scss";
import { useAuth } from "../../components/AuthProvider";
import CompanyFormElements from "../../components/CompanyFormElements/CompanyFormElements";

function CompanyCreatePage() {
    const auth = useAuth();
    const [errors, setErrors] = useState({});

    return (
        <main className="company-create-page-main">
            <h1 className="company-create-page-title">Şirket Hesabı Açın</h1>
            <div className="company-and-admin-create-div">
                <CompanyFormElements errors={errors} setErrors={setErrors} />
            </div>
        </main>
    );
};

export default CompanyCreatePage;
