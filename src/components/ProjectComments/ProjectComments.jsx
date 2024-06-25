import React, { useEffect, useState } from 'react';
import "./ProjectComments.scss";

function ProjectProcess({ clickedProject }) {

    const [comments, setComments] = useState([]);
    const [projectReviseStates, setProjectRevises] = useState([]);

    useEffect(() => {
        if (clickedProject) {
            const projectRevises = clickedProject.attributes.project_revises.data;

            const reviseStateMap = {
                1: "yapılacak",
                2: "yapılıyor",
                3: "yapıldı",
                4: "iptal edildi"
            };

            const projectReviseStates = projectRevises.map(revise =>
                reviseStateMap[revise.attributes.reviseState] || 'Durum bilgisi yok'
            );
            setProjectRevises(projectReviseStates);

            const projectComments = projectRevises.flatMap(revise =>
                revise.attributes.comment.flatMap(comment =>
                    comment.children.map(child => child.text)
                )
            );
            setComments(projectComments);
        }
    }, [clickedProject]);

    return (
        <div className="project-comments-main">
            <h2 className='project-comments-h2'>Proje Revizeleri</h2>
            <div className='project-comments-table' >
                <ul className='project-comments-ul'>
                    {projectReviseStates.map((state, index) => (
                        <li key={index} className='project-comments-states'>
                            {state}
                        </li>
                    ))}
                </ul>

                <ul className='project-comments-ul'>
                    {comments.map((comment, index) => (
                        <li key={index} className='project-comments-li'>
                            {comment}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProjectProcess;
