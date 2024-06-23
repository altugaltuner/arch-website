import React, { useState } from "react";
import "./CompanyName.scss";
import { useAuth } from "../AuthProvider";

function CompanyName() {
    const { user } = useAuth();

    console.log(user, "user ama companyName verisi gelmiyor.");
    const [companyName, setCompanyName] = useState("ArchiNova Mimarlık ve İnşaat");

    return (
        <div className="company-name-main">
            <h1 className="company-name">{companyName}</h1>
        </div>
    );
}

export default CompanyName;
