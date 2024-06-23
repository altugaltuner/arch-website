import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./ProjectComments.scss";

function ProjectProcess({ clickedProject }) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (clickedProject) {
            const projectRevises = clickedProject.attributes.project_revises.data;
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
            <ul className='project-comments-ul'>
                {comments.map((comment, index) => (
                    <li key={index} className='project-comments-li'>
                        {comment}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProjectProcess;
