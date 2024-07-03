import React, { useEffect, useState } from 'react';
import "./ProjectComments.scss";

function ProjectComments({ clickedProject }) {

    const [commentsWithDetails, setCommentsWithDetails] = useState([]);

    useEffect(() => {
        if (clickedProject) {
            //console.log("clickedProject", clickedProject);
            const projectRevises = clickedProject.attributes.project_revises.data;
            const users = clickedProject.attributes.users.data;

            const reviseStateMap = {
                1: "yapılacak",
                2: "yapılıyor",
                3: "yapıldı",
                4: "iptal edildi"
            };

            const commentsWithDetails = projectRevises.flatMap(revise =>
                revise.attributes.comment.flatMap(comment =>
                    comment.children.map(child => {
                        const owner = users.find(user => user.id === revise.id);
                        return {
                            text: child.text,
                            reviseState: reviseStateMap[revise.attributes.reviseState] || 'Durum bilgisi yok',
                            owner: owner ? owner.attributes.username : 'Sahip bilgisi yok'
                        };
                    })
                )
            );

            setCommentsWithDetails(commentsWithDetails);
        }
    }, [clickedProject]);

    return (
        <div className="project-comments-main">
            <h2 className='project-comments-h2'>Proje Revizeleri</h2>
            <div className='project-comments-table'>
                <div className='comment-table-head'>
                    <div className='comment-table-head-text'>Revize</div>
                    <div className='comment-table-head-state'>Durum</div>
                    <div className='comment-table-head-owner'>Revize Sahibi</div>
                </div>
                {commentsWithDetails.map((commentWithDetail, index) => (
                    <div key={index} className='project-comment-item'>
                        <div className='project-comment-text'>
                            {commentWithDetail.text}
                        </div>
                        <div className='project-comment-state'>
                            {commentWithDetail.reviseState}
                        </div>
                        <div className='project-comment-owner'>
                            {commentWithDetail.owner}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectComments;
