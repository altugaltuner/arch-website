"use client";
import React, { useState, useEffect } from "react";
import "./CompanyName.scss";
import { useAuth } from "../AuthProvider";

const CompanyName = ({ onSearch, setIsLoading }) => {
    let userData = null;
    const [companyName, setCompanyName] = useState(null);

    try {
        const { user } = useAuth();
        if (user) {
            userData = user;
            setIsLoading(false);
        }
    }
    catch (e) {
        console.log(e);
    }

    useEffect(() => {
        if (userData && userData.company && userData.company.companyName) {
            setCompanyName(userData.company.companyName);
        } else {
            console.log("userData data is not available or companyName is missing");
        }
    }, []);

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    if (companyName === null) {
        return null;
    }

    return (
        <div className="company-name-main">
            <h1 className="company-name">{companyName}</h1>
            <input
                className="company-search"
                type="text"
                onChange={handleSearchChange}
                placeholder="Ara..."
            />
        </div>
    );
}

export default CompanyName;
