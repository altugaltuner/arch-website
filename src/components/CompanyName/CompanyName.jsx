import React, { useState, useEffect } from "react";
import "./CompanyName.scss";
import { useAuth } from "../AuthProvider";

function CompanyName() {
    const { user } = useAuth();

    const [companyName, setCompanyName] = useState(null);

    useEffect(() => {
        if (user && user.company && user.company.companyName) {
            setCompanyName(user.company.companyName);
        } else {
            console.log("User data is not available or companyName is missing");
        }
    }, [user]);

    if (companyName === null) {
        return null; // or you can show a loading spinner
    }

    return (
        <div className="company-name-main">
            <h1 className="company-name">{companyName}</h1>
        </div>
    );
}

export default CompanyName;
