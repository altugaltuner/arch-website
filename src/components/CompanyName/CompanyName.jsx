import React, { useState, useEffect } from "react";
import "./CompanyName.scss";
import { useAuth } from "../AuthProvider";

function CompanyName() {
    const { user } = useAuth();

    const [companyName, setCompanyName] = useState("ArchiNova Mimarlık ve İnşaat");

    useEffect(() => {
        setCompanyName(user.company.companyName);
    }, []);

    return (
        <div className="company-name-main">
            <h1 className="company-name">{companyName}</h1>
        </div>
    );
}

export default CompanyName;
