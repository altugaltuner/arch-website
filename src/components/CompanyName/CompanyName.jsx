"use client";
import React, { useState, useEffect } from "react";
import "./CompanyName.scss";
import { useAuth } from "../AuthProvider";

const CompanyName = ({ onSearch, setIsLoading }) => {
    const [companyName, setCompanyName] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setIsLoading(false);
        }

        if (user && user.company && user.company.companyName) {
            setCompanyName(user.company.companyName);
        } else {
            console.log("user data is not available or companyName is missing");
        }
    }, [user, setIsLoading]);

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
