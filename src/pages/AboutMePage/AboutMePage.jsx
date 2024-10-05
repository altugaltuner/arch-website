import React, { useState, useEffect } from "react";
import "./AboutMePage.scss";
import { api } from "../../api";
import Navigation from "../../components/Navigation/Navigation";
import MyProfile from "../../components/MyProfile/MyProfile";
import MyActiveProjects from "../../components/MyActiveProjects/MyActiveProjects";
import MyPersonalFiles from "../../components/MyPersonalFiles/MyPersonalFiles";
import MyLastAct from "../../components/MyLastAct/MyLastAct";
import OpenInboxModal from "../../components/OpenInboxModal/OpenInboxModal";
import inboxLogo from "../../assets/icons/inbox-logo.png";
import MyNotebook from "../../components/MyNotebook/MyNotebook";

const CACHE_DURATION = 15 * 60 * 1000;

function AboutMePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showInboxModal, setShowInboxModal] = useState(false);

    useEffect(() => {
        const checkCurrentPerson = async () => {
            const cachedUser = localStorage.getItem(`user-me`);
            const cachedTimestampUser = localStorage.getItem(`user-me_timestamp`);

            if (cachedUser && cachedTimestampUser) {
                const age = Date.now() - parseInt(cachedTimestampUser, 10);
                if (age < CACHE_DURATION) {
                    setUser(JSON.parse(cachedUser));
                    return;
                }
            }

            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await api.get(`https://bold-animal-facf707bd9.strapiapp.com/api/users/me?populate=profilePic,project_revises,profession`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                    localStorage.setItem(`user-me`, JSON.stringify(response.data));
                    localStorage.setItem(`user-me_timestamp`, Date.now().toString());
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

    function openInboxModal() {
        setShowInboxModal(true);
    };

    return (
        <div className="aboutme-page-main">
            <Navigation />
            <OpenInboxModal showInboxModal={showInboxModal} setShowInboxModal={setShowInboxModal} />
            <div className="aboutme-page-column">
                <div className="aboutme-row-2">
                    <h1 className="div-big-header">Profilim</h1>
                    <img src={inboxLogo} alt="message-inbox" className="message-inbox" onClick={() => { openInboxModal() }} />
                </div>
                <div className="aboutme-page-row">
                    <MyProfile user={user} />
                    <div className="aboutme-page-column-2">
                        <MyActiveProjects user={user} />
                        <div className="aboutme-row-3">
                            <MyLastAct user={user} />
                            <MyNotebook user={user} />
                        </div>
                    </div>
                    <MyPersonalFiles user={user} />
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;
