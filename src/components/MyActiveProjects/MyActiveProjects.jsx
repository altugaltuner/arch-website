import React, { useState, useEffect } from "react";
import "../MyActiveProjects/MyActiveProjects.scss";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const CACHE_DURATION = 15 * 60 * 1000; // 15 dakika


function MyActiveProjects({ user }) {
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();
    //burada saçma olmuş, userın  projelerini almak için tüm userları çekmeye gerek yok. userın idsi ile projeleri çekmek daha mantıklı olurdu.
    useEffect(() => {
        const fetchData = async () => {
            const cachedUsers = localStorage.getItem(`users`);
            const cachedTimestampUsers = localStorage.getItem(`users_timestamp`);

            if (cachedUsers && cachedTimestampUsers) {
                const age = Date.now() - parseInt(cachedTimestampUsers, 10);
                if (age < CACHE_DURATION) {
                    console.log('Veriler localStorage\'dan yükleniyor');
                    setAllUsers(JSON.parse(cachedUsers));
                    return;
                }
            }
            try {
                const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/users?populate[profession]=*&populate[projects][populate]=projectCoverPhoto&populate=profilePic');
                setAllUsers(response.data || []);
                localStorage.setItem(`users`, JSON.stringify(response.data));
                localStorage.setItem(`users_timestamp`, Date.now().toString());
                console.log('Veriler API\'den yükleniyor');
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
    }, [allUsers]);

    if (!user || !user.username) {
        return <div>Kullanıcı Bilgisi Yükleniyor.</div>;
    }
    const filteredUser = allUsers.filter(u => u.username === user.username);

    const userElements = filteredUser.map(u => (
        <div className="my-active-project-div" key={u.id}>
            <h2 className="div-header">Dahil Olduğum Projeler</h2>
            <div className="my-active-project-list">
                {u.projects.map(p => (
                    <div className="my-active-project-list-element" key={p.id} onClick={() => handleProjectClick(p.id)}>
                        <img className="my-active-project-list-pic" src={p.projectCoverPhoto.formats.thumbnail.url || p.projectCoverPhoto.url} alt="" />
                        <p className="my-active-project-list-paragraph" key={p.id}>{p.projectName}</p>
                    </div>
                ))}
            </div>
        </div>
    ));

    const handleProjectClick = (projectId) => {

        navigate(`/projects/${projectId}`);
    };

    return (
        <div className="myactive-projects-main">
            <div className="active-projects-container">
                {userElements}
            </div>
        </div>
    );
};

export default MyActiveProjects;


