import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./MyPersonalFiles.scss";

function AboutMePage({ user }) {

    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=MyPersonalFiles');
                console.log("Fetched users:", response.data);
                setAllUsers(response.data);
                console.log("All Users:", allUsers);

            } catch (error) {
                console.error('Error fetching the data', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching data
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log("All Users state updated:", allUsers);
    }, [allUsers]);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading message while data is being fetched
    }

    if (!user) {
        return <div>No user data available.</div>;
    }

    const filteredUser = allUsers.find(u => u.username === user.username);

    if (!filteredUser || !filteredUser.MyPersonalFiles) {
        return <div>No personal files available for this user.</div>;
    }

    const uploadMyFile = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*'; // Allow only image files
        fileInput.addEventListener('change', handleFileUpload);
        fileInput.click();
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:1337/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded:', response.data);

            // Update the filteredUser's MyPersonalFiles array with the uploaded file
            const updatedFiles = [...filteredUser.MyPersonalFiles, response.data];
            const updatedUser = { ...filteredUser, MyPersonalFiles: updatedFiles };
            setAllUsers(prevUsers => prevUsers.map(u => u.username === user.username ? updatedUser : u));
        } catch (error) {
            console.error('Error uploading the file', error);
        }
    };


    return (
        <div className="my-files-panel">
            <h2 className="my-files-panel-header">Dosyalarım</h2>
            <div className="my-folders">
                <div className="my-folder" onClick={uploadMyFile}>Yükle</div>
                {filteredUser.MyPersonalFiles.map((file, index) => (
                    <div key={index} className="my-folder">
                        <img className="my-folder-preview" src={`http://localhost:1337${file.formats.thumbnail.url}`} alt="folder" />
                        <p className="my-folder-name">{file.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutMePage;
