import React, { useState, useEffect } from "react";
import "../MyActiveProjects/MyActiveProjects.scss";
import axios from "axios";

function MyActiveProjects({ user }) {
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=projects');
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
                    <p className="my-active-project-list-element" key={p.id}>{p.projectName}</p>
                ))}
            </div>
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
