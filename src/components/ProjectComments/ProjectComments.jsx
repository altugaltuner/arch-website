import React, { useEffect, useState } from 'react';
import "./ProjectComments.scss";
import NewReviseModal from "../../components/NewReviseModal/NewReviseModal";
import ReviseUpdateModal from "../../components/ReviseUpdateModal/ReviseUpdateModal";
import ReviseViewModal from "../../components/ReviseViewModal/ReviseViewModal";
import axios from 'axios';
import { useAuth } from "../../components/AuthProvider";
import editPencil from "../../assets/icons/edit-pencil.png";

function ProjectComments({ clickedProject }) {
    const [commentsWithDetails, setCommentsWithDetails] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRevise, setSelectedRevise] = useState(null);

    const { user } = useAuth();
    console.log(user);
    const userId = user.id;

    useEffect(() => {
        if (clickedProject) {
            fetchComments(clickedProject);
        }
    }, [clickedProject]);

    const fetchComments = async (project) => {
        try {
            const response = await axios.get(`http://localhost:1337/api/project-revises?filters[project][id][$eq]=${project.id}&populate=*`);
            const projectRevises = response.data.data;

            const users = project.attributes.users.data;

            const reviseStateMap = {
                1: "yapılacak",
                2: "yapılıyor",
                3: "yapıldı",
                4: "iptal edildi"
            };

            const commentsWithDetails = projectRevises.flatMap(revise =>
                revise.attributes.comment.flatMap(comment =>
                    comment.children.map(child => {
                        const owner = users.find(user => user.id === revise.attributes.user.data.id);
                        return {
                            id: revise.id,
                            text: child.text,
                            reviseState: reviseStateMap[revise.attributes.reviseState] || 'Durum bilgisi yok',
                            owner: owner ? owner.attributes.username : 'Sahip bilgisi yok',
                            ownerId: owner ? owner.id : null
                        };
                    })
                )
            );

            setCommentsWithDetails(commentsWithDetails);
        } catch (error) {
            console.error('Revizeler alınırken bir hata oluştu:', error);
        }
    };

    const openNewReviseModal = () => {
        setIsModalOpen(true);
    };

    const closeNewReviseModal = () => {
        setIsModalOpen(false);
    };

    const openUpdateReviseModal = (revise) => {
        setSelectedRevise(revise);
        setIsUpdateModalOpen(true);
    };

    const closeUpdateReviseModal = () => {
        setIsUpdateModalOpen(false);
    };

    const openViewReviseModal = (revise) => {
        setSelectedRevise(revise);
        setIsViewModalOpen(true);
    };

    const closeViewReviseModal = () => {
        setIsViewModalOpen(false);
    };

    const handleReviseAdded = (newRevise) => {
        const reviseAttributes = newRevise.data.attributes;

        if (!reviseAttributes || !reviseAttributes.comment || !reviseAttributes.comment[0] || !reviseAttributes.comment[0].children || !reviseAttributes.comment[0].children[0]) {
            console.error('Yeni revize verisi beklenen formatta değil:', newRevise);
            return;
        }

        const newComment = {
            id: newRevise.data.id,
            text: reviseAttributes.comment[0].children[0].text,
            reviseState: reviseAttributes.reviseState,
            owner: user.username, // Bu değer uygun şekilde değiştirilmeli
            ownerId: user.id
        };

        setCommentsWithDetails((prevComments) => [...prevComments, newComment]);
    };

    const handleReviseUpdated = (updatedRevise) => {
        const reviseAttributes = updatedRevise.data.attributes;

        const updatedComment = {
            id: updatedRevise.data.id,
            text: reviseAttributes.comment[0].children[0].text,
            reviseState: reviseAttributes.reviseState,
            owner: user.username, // Bu değer uygun şekilde değiştirilmeli
            ownerId: user.id
        };

        setCommentsWithDetails((prevComments) =>
            prevComments.map((comment) =>
                comment.id === updatedComment.id ? updatedComment : comment
            )
        );
    };

    return (
        <div className="project-comments-main">
            <h2 className='project-comments-h2'>Proje Revizeleri</h2>
            <button className='new-revise-create-btn' onClick={openNewReviseModal}>Revize Yaz</button>
            <div className='project-comments-table'>
                <div className='comment-table-head'>
                    <div className='comment-table-head-text'>Revize</div>
                    <div className='comment-table-head-state'>Durum</div>
                    <div className='comment-table-head-owner'>Revize Sahibi</div>
                </div>
                {commentsWithDetails.map((commentWithDetail, index) => (
                    <div key={index} className='project-comment-item'>
                        <div className='project-comment-text' onClick={() => commentWithDetail.ownerId === user.id ? openUpdateReviseModal(commentWithDetail) : openViewReviseModal(commentWithDetail)}>
                            {commentWithDetail.ownerId === user.id && <img className='edit-pencil-for-revise' src={editPencil} alt="edit-pencil-for-revise" />}
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
            <NewReviseModal user={user} clickedProject={clickedProject} isOpen={isModalOpen} onClose={closeNewReviseModal} onReviseAdded={handleReviseAdded} />
            {selectedRevise && <ReviseUpdateModal isOpen={isUpdateModalOpen} onClose={closeUpdateReviseModal} revise={selectedRevise} onReviseUpdated={handleReviseUpdated} />}
            {selectedRevise && <ReviseViewModal isOpen={isViewModalOpen} onClose={closeViewReviseModal} revise={selectedRevise} />}
        </div>
    );
}

export default ProjectComments;
