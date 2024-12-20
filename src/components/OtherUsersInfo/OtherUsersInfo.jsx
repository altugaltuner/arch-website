import React, { useState, useEffect } from 'react';
import './OtherUsersInfo.scss';
import PrivateMessageModal from "./PrivateMessageModal";
import { useAuth } from "../AuthProvider";
import editPencil from "../../assets/icons/edit-pencil.png";

function OtherUsersInfo({ employee }) {
    const { user } = useAuth();
    const userRole = user && user.access ? user.access.role : null;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [privateMessages, setPrivateMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [newProfessionName, setNewProfessionName] = useState('');
    const [professions, setProfessions] = useState([]);

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const response = await fetch('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/professions?populate=*');
                const result = await response.json();
                setProfessions(result.data);
            } catch (error) {
            }
        };

        fetchProfessions();
    }, []);

    useEffect(() => {
        if (employee && employee.profession && employee.profession.data && employee.profession.data.attributes) {
            setNewProfessionName(employee.profession.data.attributes.professionName);
        } else {
            setNewProfessionName('Henüz Belirtilmedi');
        }
    }, [employee]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/private-messages/?populate=*');
                const result = await response.json();
                setPrivateMessages(result.data);
            } catch (error) {
            }
        };

        fetchMessages();
    }, []);

    useEffect(() => {
        const filterMessages = () => {
            const filtered = privateMessages?.filter(message => {
                const senderId = message.attributes.users_permissions_user?.data?.id;
                const recipientId = message.attributes.recipientID;
                return (
                    (senderId === user?.id && recipientId === employee?.id)
                    ||
                    (senderId === employee?.id && recipientId === user?.id)
                );
            });
            setFilteredMessages(filtered);
        };

        filterMessages();
    }, [employee, privateMessages, user.id]);

    const handleMessageSent = (newMessage) => {
        setPrivateMessages(prevMessages => [newMessage, ...prevMessages]);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        if (employee && employee.profession && employee.profession.data && employee.profession.data.attributes) {
            setNewProfessionName(employee.profession.data.attributes.professionName);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await fetch(`https://wonderful-pleasure-64045d06ec.strapiapp.com/api/users/${employee?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    profession: {
                        professionName: newProfessionName,
                    },
                }),
            });

            if (response.ok) {
                const updatedEmployee = await response.json();
                setIsEditing(false);
                if (employee && employee.profession && employee.profession.data && employee.profession.data.attributes) {
                    employee.profession.data.attributes.professionName = updatedEmployee.profession.professionName;
                }
            }
        } catch (error) {
        }
    };


    if (!employee) {
        return (
            <div className="other-info-main">
                <h1 className='other-info-header'>Görüntülemek istediğiniz çalışanı seçin.</h1>
            </div>
        );
    }

    return (
        <div className="other-info-main">
            <div className='revise-and-profile'>
                <div className='other-info-inner'>
                    <div className='other-info-inner-2'>
                        <img
                            className="other-info-profile-pic"
                            src={employee.profilePic?.data?.attributes?.url || employee.profilePic?.data?.attributes?.formats?.thumbnail?.url || ""}
                            alt=""
                        />
                        <p className='other-info-username'>{employee.username}</p>
                        <p className='other-info-email'>{employee.email}</p>
                        <div className='profession-editing-div'>
                            {isEditing ? (
                                <div>
                                    <select
                                        value={newProfessionName}
                                        onChange={(e) => setNewProfessionName(e.target.value)}
                                    >
                                        {professions.map((profession) => (
                                            <option key={profession.id} value={profession.attributes.professionName}>
                                                {profession.attributes.professionName}
                                            </option>
                                        ))}
                                    </select>
                                    <button className='confirm-small' onClick={handleSaveClick}>Onayla</button>
                                    <button className='cancel-small' onClick={handleCancelClick}>İptal</button>
                                </div>
                            ) : (
                                <div>
                                    <p className='other-info-professionname'>{employee?.profession?.data?.attributes?.professionName ?? "Henüz Belirtilmedi"}</p>
                                    {userRole === "Admin" && (
                                        <img src={editPencil} className='pencil-profession-edit' alt="edit-pencil" onClick={handleEditClick} />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='other-all-revises-inner'>
                    <h2 className='other-revises-h2'>Revizeler</h2>
                    {employee.project_revises && employee.project_revises.data.length > 0 ? (
                        employee.project_revises.data.map((revise) => (
                            <div key={revise.id} className='other-revise-div'>
                                <p className='other-revise-p'>{revise.attributes.comment[0]?.children[0]?.text}</p>
                            </div>
                        ))
                    ) : (
                        <p className='other-revise-p'>Revize Yok</p>
                    )}
                </div>
            </div>
            <div className='other-joined-all'>
                <div className='other-all-projects'>
                    <h2 className='other-joined-projects-h2'>Dahil Olduğu Projeler</h2>
                    <div className='other-column'>
                        {employee.projects && employee.projects.data.map((project) => (
                            <div key={project.id} className='other-project-div'>
                                <p className='other-project-p'>{project.attributes.projectName}</p>
                                {project.attributes.projectCoverPhoto?.data?.attributes?.formats?.thumbnail?.url && (
                                    <img
                                        className="other-project-photo"
                                        src={project.attributes.projectCoverPhoto.data.attributes.formats.thumbnail.url || project.attributes.projectCoverPhoto.data.attributes.url || ''}
                                        alt={project.attributes.projectName}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='other-all-groups'>
                <h2 className='other-groups-joined-h2'>Dahil Olduğu Gruplar</h2>
                <div className='all-groups-row-div'>
                    {employee.groups && employee.groups.data.length > 0 ? (
                        employee.groups.data.map((group) => (
                            <p className='other-groups-name'>{group.attributes.groupName}</p>
                        ))
                    ) : (
                        <p className='no-group-p'>Bu çalışan hiçbir gruba dahil değil.</p>
                    )}
                </div>
            </div>
            <div className="open-inbox-content-private-messages-div">
                <h2 className='open-inbox-modal-header-private'>Mesajlaşma Geçmişiniz</h2>
                <div className="messages-container-private">
                    {filteredMessages?.map(message => (
                        <div key={message.id} className="message-private">
                            <h3 className="message-header-private">{message.attributes.messageTitle}</h3>
                            <p className="message-owner-private">{message.attributes.users_permissions_user?.data?.attributes?.username} :</p>
                            <p className="message-content-private">{message.attributes.messageContent}</p>
                            {message.attributes?.messageMedia?.data?.length > 0 && (
                                <div className="message-media-div-private">
                                    {message.attributes.messageMedia.data.map(media => (
                                        <img className="message-media-img-private" key={media.id} src={media.attributes.url} alt={media.attributes.name} />
                                    ))}
                                </div>
                            )}
                            <p className='priv-message-date'>{new Date(message.attributes.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <button className='write-priv-message' onClick={() => setIsModalOpen(true)}>İleti Gönder</button>
                <PrivateMessageModal user={user} employee={employee} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onMessageSent={handleMessageSent} />
            </div>
        </div>
    );
}

export default OtherUsersInfo;
