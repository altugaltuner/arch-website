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

function AboutMePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showInboxModal, setShowInboxModal] = useState(false);

    useEffect(() => {
        const checkCurrentPerson = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await api.get(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/users/me?populate=profilePic,project_revises,profession`, {
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