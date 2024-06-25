import React, { useState, useEffect } from "react";
import "./AboutMePage.scss";
import { api } from "../../api";
import Navigation from "../../components/Navigation/Navigation";
import MyProfile from "../../components/MyProfile/MyProfile";
import MyActiveProjects from "../../components/MyActiveProjects/MyActiveProjects";
import MyPersonalFiles from "../../components/MyPersonalFiles/MyPersonalFiles";
import MyLastAct from "../../components/MyLastAct/MyLastAct";

function AboutMePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkCurrentPerson = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await api.get(`http://localhost:1337/api/users/me?populate=profilePic,project_revises`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkCurrentPerson();
    }, []);

    return (
        <div className="aboutme-page-main">
            <Navigation />
            <div className="aboutme-page-column">
                <h1 className="aboutme-page-title">Profilim</h1>
                <div className="aboutme-page-row">
                    <MyProfile user={user} />
                    <div className="aboutme-page-column">
                        <MyLastAct user={user} />
                        <MyActiveProjects user={user} />
                    </div>
                    <MyPersonalFiles user={user} />
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;
