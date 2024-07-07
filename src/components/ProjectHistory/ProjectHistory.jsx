// ProjectHistory.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectHistory.scss';

function ProjectHistory({ clickedProject }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const response = await axios.get(`http://localhost:1337/api/histories?filters[project][id][$eq]=${clickedProject.id}&populate=user`);
                setHistory(response.data.data);
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        }

        if (clickedProject) {
            fetchHistory();
        }
    }, [clickedProject]);

    return (
        <div className="project-history-main">
            <h1 className="project-history-header">Proje Tarihçesi</h1>
            <div className="project-history-div">
                {history.map((entry, index) => (
                    <p key={index} className="history-paragraph">
                        {entry.attributes.user.username} {entry.attributes.action} "{entry.attributes.fileOrFolder}" - {new Date(entry.attributes.timestamp).toLocaleDateString()}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default ProjectHistory;
