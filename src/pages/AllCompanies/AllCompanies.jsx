import React, { useState, useEffect } from "react";
import "./AllCompanies.scss";
import axios from "axios";

import Navigation from "../../components/Navigation/Navigation";

function AllCompanies() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        async function getCompanies() {
            try {
                const response = await axios.get('http://localhost:1337/api/companies?populate=*');
                setCompanies(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getCompanies();
    }, []);

    return (
        <div className="all-companies-page-main">
            <Navigation />
            <div className="all-companies-page-column">
                <h1 className="all-companies-page-title">Tüm Şirketler</h1>
                <div className="all-companies-page-row">
                    {companies.map((company) => (
                        <div key={company.id} className="all-companies-page-company-card">
                            <h2 className="company-hub-header">{company.attributes.companyName}</h2>
                            <img className="company-hub-one-logo" src={`http://localhost:1337${company.attributes.companyLogo.data.attributes.formats.thumbnail.url}`} alt="company-logo" srcSet="" />
                            <p className="company-hub-working-area">{company.attributes.workingArea}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllCompanies;
