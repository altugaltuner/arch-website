import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectHistory.scss';

function ProjectHistory({ clickedProject, newHistoryEntry }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        async function fetchHistory() {
            try {
                if (clickedProject?.id) {
                    const response = await axios.get(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/histories?filters[project][id][$eq]=${clickedProject.id}&populate=*`);
                    setHistory(response.data.data || []);
                    localStorage.setItem(`project_${clickedProject.id}_history`, JSON.stringify(response.data.data));
                    localStorage.setItem(`project_${clickedProject.id}_history_timestamp`, Date.now().toString());
                }
            } catch (error) {
            }
        }

        fetchHistory();
    }, [clickedProject]);

    useEffect(() => {
        if (newHistoryEntry) {
            setHistory(prevHistory => [newHistoryEntry, ...prevHistory]);
        }
    }, [newHistoryEntry]);

    return (
        <div className="project-history-main">
            <h1 className="div-header">Proje Tarihçesi</h1>
            <div className="project-history-div">
                {history.length > 0 ? (
                    history.map((entry, index) => (
                        <p key={index} className="paragraph">
                            {entry?.attributes?.users_permissions_users?.data[0]?.attributes?.username || "Kullanıcı"} "{entry?.attributes?.folder}" adlı klasör üzerinde "{entry?.attributes?.action}" işlemini gerçekleştirdi - {new Date(entry?.attributes?.timestamp).toLocaleDateString()}
                        </p>
                    ))
                ) : (
                    <p className='no-history-p'>Tarihçe kaydı bulunmamaktadır.</p>
                )}
            </div>
        </div>
    );
}
export default ProjectHistory;