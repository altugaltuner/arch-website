import React, { useState, useEffect } from "react";
import "./AboutMePage.scss";
import { api } from "../../api"; // Doğru yolu kullanın
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";
import MyProfile from "../../components/MyProfile/MyProfile";
import MyActiveProjects from "../../components/MyActiveProjects/MyActiveProjects";
import MyPersonalFiles from "../../components/MyPersonalFiles/MyPersonalFiles";
import MyLastAct from "../../components/MyLastAct/MyLastAct";

function AboutMePage() {
    const auth = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkCurrentPerson = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await api.get(`http://localhost:1337/api/users/me?populate=profilePic`, {
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
            <div className="aboutme-page-row">
                <MyProfile user={user} />
                <MyLastAct />
                <MyActiveProjects user={user} />
                <MyPersonalFiles user={user} />
            </div>
        </div>
    );
};

export default AboutMePage;
