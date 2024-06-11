import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./MyPersonalFiles.scss";

function AboutMePage({ user }) {

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=MyPersonalFiles');
                console.log("Fetched users:", response.data);
                setAllUsers(response.data || []);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log("All Users:", allUsers);
    }, [allUsers]);

    if (!user || !user.MyPersonalFiles) {
        return <div>No user data available.</div>;
    }

    return (
        <div className="my-files-panel">
            <h2 className="my-files-panel-header">Dosyalarım</h2>
            <div className="my-folders">
                <div className="my-folder">
                    <img className="my-folder-preview" src="path/to/windows-folder-logo.png" alt="folder" />
                    <p className="my-folder-name">Klasör 1</p>
                </div>
                <div className="my-folder">
                    <img className="my-folder-preview" src="path/to/windows-folder-logo.png" alt="folder" />
                    <p className="my-folder-name">Klasör 2</p>
                </div>
                <div className="my-folder">
                    <img className="my-folder-preview" src="path/to/windows-folder-logo.png" alt="folder" />
                    <p className="my-folder-name">Klasör 3</p>
                </div>
                <div className="my-folder">
                    <img className="my-folder-preview" src="path/to/windows-folder-logo.png" alt="folder" />
                    <p className="my-folder-name">Klasör 4</p>
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;
