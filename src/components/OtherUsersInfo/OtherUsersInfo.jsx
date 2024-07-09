import React, { useEffect, useState } from 'react';
import './OtherUsersInfo.scss';

function OtherUsersInfo({ employee }) {

    if (!employee) {
        return (
            <div className="other-info-main">
                <h1 className='other-info-header'>Görüntülemek istediğiniz çalışanı seçin.</h1>
            </div>
        );
    }

    const [privateMessages, setPrivateMessages] = useState([]);


    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/private-messages/?populate=*');
                const result = await response.json();
                setPrivateMessages(result.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="other-info-main">
            <div className='revise-and-profile'>
                <div className='other-info-inner'>
                    <div className='other-info-inner-2'>
                        <img
                            className="other-info-profile-pic"
                            src={`http://localhost:1337${employee.profilePic?.data.attributes.url || ""}`}
                            alt=""
                        />
                        <p className='other-info-username'>{employee.username}</p>
                        <p className='other-info-email'>{employee.email}</p>
                        <p className='other-info-professionname'>{employee.profession.data.attributes.professionName}</p>
                    </div>
                </div>
                <div className='other-all-revises-inner'>
                    <h2 className='other-revises-h2'>Revizeler</h2>

                    {employee.project_revises && employee.project_revises.data.map((revise) => (
                        <div key={revise.id} className='other-revise-div'>
                            <p className='other-revise-p'>{revise.attributes.comment[0].children[0].text}</p>
                        </div>
                    ))}
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
                                        src={`http://localhost:1337${project.attributes.projectCoverPhoto.data.attributes.formats.thumbnail.url}`}
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
                {employee.groups && employee.groups.data.map((group) => (
                    <div key={group.id} className='other-groups'>
                        <p className='other-groups-name'>{group.attributes.groupName}</p>
                    </div>
                ))}
            </div>

            {/* buradan sonrası kisisel mesajlar */}

            <div className="open-inbox-content-private-messages-div">
                <h2 className='open-inbox-modal-header-private'>İletiler</h2>
                <div className="messages-container-private">
                    {privateMessages.map(message => (
                        <div key={message.id} className="message-private">
                            <h3 className="message-header-private">{message.attributes.messageTitle}</h3>
                            <p className="message-owner-private">{message.attributes.users_permissions_user?.data?.attributes?.username}</p>
                            <p className="message-content-private">{message.attributes.messageContent}</p>
                            {message.attributes?.messageMedia?.data?.length > 0 && (
                                <div className="message-media-div-private">
                                    {message.attributes.messageMedia.data.map(media => (
                                        <img className="message-media-img-private" key={media.id} src={`http://localhost:1337${media.attributes.url}`} alt={media.attributes.name} />
                                    ))}
                                </div>
                            )}
                            <p className='priv-message-date'>{new Date(message.attributes.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <button className='write-priv-message'>İleti Gönder</button>
            </div>
        </div>
    );
}

export default OtherUsersInfo;
