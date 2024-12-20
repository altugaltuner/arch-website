import React, { useState, useEffect } from "react";
import "./ProjectProcess.scss";
import { useAuth } from "../../components/AuthProvider";

function ProjectProcess({ clickedProject }) {
    const [projectProcess, setProjectProcess] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const { user } = useAuth();
    const userRole = user && user.access ? user.access.role : null;

    useEffect(() => {
        const projectPercentage = clickedProject?.attributes?.projectProcess;

        if (projectPercentage !== null) {
            setProjectProcess(projectPercentage);
            setInputValue(projectPercentage);
        }
    }, [clickedProject]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value >= 0 && value <= 100) {
            setInputValue(value);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/projects/${clickedProject.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        projectProcess: inputValue
                    }
                })
            });
            if (response.ok) {
                const updatedProject = await response.json();
                setProjectProcess(updatedProject.data.attributes.projectProcess);
            } else {
                alert("Proje durumu güncellenirken bir hata oluştu!");
            }
        } catch (error) {
            alert("Bir hata oluştu: " + error.message);
        }
    };

    return (
        <div className="project-process-main">
            <h1 className="div-header">Proje Durumu</h1>
            <p className="project-percentage">{projectProcess} % 100</p>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${projectProcess}%` }}>
                    {projectProcess}%
                </div>
            </div>

            {projectProcess === 100 ? <p className="project-completed">Proje Tamamlandı</p> : null}

            {userRole === "Admin" || userRole === "Contributor" ? (
                <div className="project-process-input">
                    <p className="project-process-p">Projenin Durumunu Güncelleyin</p>
                    <input
                        className="project-process-input-box"
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        placeholder="Proje Yüzdesini Girin"
                    />
                    <button className="project-process-submit-button" onClick={handleSubmit}>Onayla</button>
                </div>
            ) :
                null
            }
        </div>
    );
}

export default ProjectProcess;
