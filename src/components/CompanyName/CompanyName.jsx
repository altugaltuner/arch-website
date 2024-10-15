"use client";
import React from "react";
import "./CompanyName.scss";

const CompanyName = () => {
    const companyName = "Altınkaya İnşaat";

    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="company-name-main">
            <h1 className="div-big-header">{companyName}</h1>
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