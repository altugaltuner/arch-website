import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./MyPersonalFiles.scss";
import FilePreviewModal from "../../components/FilePreviewModal/FilePreviewModal";

function AboutMePage({ user }) {
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/users?populate=MyPersonalFiles');
                console.log("Fetched users:", response.data);
                setAllUsers(response.data);
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

    const filteredUser = allUsers.find(u => u.username === user?.username);

    if (!filteredUser || !filteredUser.MyPersonalFiles) {
        return <div>No personal files available for this user.</div>;
    }

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('files', file); // Ensure the field name matches what the API expects

        try {
            const uploadResponse = await axios.post('http://localhost:1337/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded:', uploadResponse.data);

            // Assuming the uploadResponse.data returns an array of files, and we are interested in the first one
            const uploadedFile = uploadResponse.data[0];

            // Update the user's MyPersonalFiles field with the new file
            const updatedFiles = [...filteredUser.MyPersonalFiles, uploadedFile];
            const updateUserResponse = await axios.put(`http://localhost:1337/api/users/${filteredUser.id}`, {
                MyPersonalFiles: updatedFiles
            });

            console.log('User updated with new file:', updateUserResponse.data);

            // Update the state with the updated user
            const updatedUser = { ...filteredUser, MyPersonalFiles: updatedFiles };
            setAllUsers(prevUsers => prevUsers.map(u => u.username === user.username ? updatedUser : u));
        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error uploading the file', error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error('Error uploading the file', error.request);
            } else {
                // Something happened in setting up the request
                console.error('Error uploading the file', error.message);
            }
        }
    };

    const uploadMyFile = () => {
        fileInputRef.current.click(); // Trigger a click event on the file input element
    };

    const showMyFileModal = (file) => {
        setSelectedFile(file);
    };

    const closeMyFileModal = () => {
        setSelectedFile(null);
    };

    const downloadMyFileModal = () => {
        if (!selectedFile) {
            console.error('No file selected for download');
            return;
        }

        // Assuming the file has a URL property
        window.open(`http://localhost:1337${selectedFile.url}`, '_blank');
    };

    return (
        <div className="my-files-panel">
            <h2 className="my-files-panel-header">Dosyalarım</h2>
            <div className="my-folders">
                <div className="my-folder" onClick={uploadMyFile}>Yükle</div>
                {filteredUser.MyPersonalFiles.map((file, index) => (
                    <div onClick={() => showMyFileModal(file)} key={index} className="my-folder">
                        {file.formats && file.formats.thumbnail ? (
                            <img className="my-folder-preview" src={`http://localhost:1337${file.formats.thumbnail.url}`} alt="folder" />
                        ) : (
                            <div className="my-folder-preview-placeholder">No Thumbnail</div>
                        )}
                        <p className="my-folder-name">{file.name}</p>
                    </div>
                ))}
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
            {selectedFile && <FilePreviewModal file={selectedFile} onClose={closeMyFileModal} onDownload={downloadMyFileModal} />}
        </div>
    );
};

export default AboutMePage;
