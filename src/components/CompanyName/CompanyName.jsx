import React, { useState } from "react";
import "./CompanyName.scss";
import { useAuth } from "../../components/AuthProvider";
import companyLogo from "../../assets/company-logo.png";
import companyBackground from "../../assets/company-background.jpg";

function CompanyName() {

    const auth = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

    return (
        <div className="company-name-main">
            <h1 className="company-name">ArchiNova Mimarlık ve İnşaat</h1>
        </div>
    );
}

export default CompanyName;
