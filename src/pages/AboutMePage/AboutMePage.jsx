import React, { useState } from "react";
import "./AboutMePage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";
import MyProfile from "../../components/MyProfile/MyProfile";
import MyActiveProjects from "../../components/MyActiveProjects/MyActiveProjects";

function AboutMePage() {

    const auth = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

    return (
        <div className="aboutme-page-main">
            <Navigation />
            <div className="aboutme-page-row">
                <MyProfile />
                <div className="aboutme-page-column">
                    <MyActiveProjects />

                </div>
            </div>
        </div>
    );
};

export default AboutMePage;
