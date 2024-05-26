import React, { useState } from "react";
import "./CompanyName.scss";
import { useAuth } from "../../components/AuthProvider";

function CompanyName() {

    const auth = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz
    const { fireStoreUser } = useAuth();
    console.log("fireStoreUser", fireStoreUser);
    return (
        <div className="company-name-main">
            <h1 className="company-name">ArchiNova Mimarlık ve İnşaat</h1>
        </div>
    );
}

export default CompanyName;
