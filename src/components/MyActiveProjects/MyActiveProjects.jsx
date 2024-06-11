import React, { useState, useEffect } from "react";
import "../MyActiveProjects/MyActiveProjects.scss";
import axios from "axios";

function MyActiveProjects({ user }) {

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=projects');
                console.log("userlar", response.data);
                setAllUsers(response.data || []);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    const filteredUser = (allUsers || []).filter(u => u.username === user.username);
    console.log("filteredUser", filteredUser);

    // Now you can map over the filteredUsers array and render the desired content
    const userElements = filteredUser.map(u => (
        <div className="my-active-project-div" key={u.id}>
            <p>{u.username}</p>
            <h2 className="my-active-project-list-header">Dahil Olduğum Projeler</h2>
            {u.projects.map(p => (
                <div className="my-active-project-list" key={p.id}>
                    <p className="my-active-project-list-element">{p.projectName}</p>
                </div>
            ))}
        </div>
    ));

    return (
        <div className="myactive-projects-main">
            <div className="active-projects">
                <div className="active-projects-container">
                    {userElements}
                </div>
            </div>
        </div>
    );
};

export default MyActiveProjects;
