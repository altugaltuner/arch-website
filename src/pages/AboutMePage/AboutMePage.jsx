import React, { useState } from "react";
import "./AboutMePage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";
import MyProfile from "../../components/MyProfile/MyProfile";
import MyActiveProjects from "../../components/MyActiveProjects/MyActiveProjects";
import MyPersonalFiles from "../../components/MyPersonalFiles/MyPersonalFiles";

function AboutMePage() {
    const auth = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

    return (
        <div className="aboutme-page-main">
            <Navigation />
            <div className="aboutme-page-row">
                <MyProfile />
                <MyActiveProjects />
                <MyPersonalFiles />
            </div>
        </div>
    );
};

export default AboutMePage;
