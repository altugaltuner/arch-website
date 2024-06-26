import React, { useState, useEffect } from "react";
import "./CompanyName.scss";
import { useAuth } from "../AuthProvider";

function CompanyName() {
    const { user } = useAuth();

    const [companyName, setCompanyName] = useState("ArchiNova Mimarlık ve İnşaat");

    useEffect(() => {
        if (user && user.company && user.company.companyName) {
            setCompanyName(user.company.companyName);
        }
    }, [user]);

    return (
        <div className="company-name-main">
            <h1 className="company-name">{companyName}</h1>
        </div>
    );
}

export default CompanyName;
