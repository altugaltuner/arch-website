import React, { useState, useEffect } from "react";
import "../MyActiveProjects/MyActiveProjects.scss";
import axios from "axios";

function MyActiveProjects({ user }) {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate[profession]=*&populate[projects][populate]=projectCoverPhoto&populate=profilePic');
                //console.log("Fetched users:", response.data);
                setAllUsers(response.data || []);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
    }, [allUsers]);

    if (!user || !user.username) {
        return <div>No user data available.</div>;
    }

    const filteredUser = allUsers.filter(u => u.username === user.username);

    const userElements = filteredUser.map(u => (
        <div className="my-active-project-div" key={u.id}>
            <h2 className="my-active-project-list-header">Dahil Olduğum Projeler</h2>
            <div className="my-active-project-list">
                {u.projects.map(p => (
                    <div className="my-active-project-list-element">
                        <img className="my-active-project-list-pic" src={`http://localhost:1337${p.projectCoverPhoto.formats.thumbnail.url}`} alt="" />
                        <p className="my-active-project-list-paragraph" key={p.id}>{p.projectName}</p>
                    </div>
                ))}
            </div>
        </div>
    ));

    return (
        <div className="myactive-projects-main">
            <div className="active-projects-container">
                {userElements}
            </div>
        </div>
    );
};

export default MyActiveProjects;
