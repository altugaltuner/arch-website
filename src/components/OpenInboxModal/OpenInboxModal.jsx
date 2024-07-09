import React, { useState, useEffect } from "react";
import "./OpenInboxModal.scss";

function OpenInboxModal({ showInboxModal, setShowInboxModal }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/multiple-messages/?populate=*');
                const result = await response.json();
                setMessages(result.data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();
    }, []);

    if (!showInboxModal) {
        return null;
    }

    return (
        <div className="open-inbox-modal">
            <div className="open-column">
                <div className="inbox-model-row">
                    <div className="open-inbox-content-massmessage-div">
                        <span className="open-inbox-modal-span" onClick={() => setShowInboxModal(false)}>X</span>
                        <h2 className='open-inbox-modal-header'>Bildirimler</h2>
                        <div className="messages-container">
                            {messages.map(message => (
                                <div key={message.id} className="message">
                                    <h3 className="message-header">{message.attributes.header}</h3>
                                    <p className="message-owner">{message.attributes.users_permissions_user?.data?.attributes?.username}</p>
                                    <p className="message-content">{message.attributes.content}</p>
                                    {message.attributes?.contentMedia?.data?.length > 0 && (
                                        <div className="message-media-div">
                                            {message.attributes.contentMedia.data.map(media => (
                                                <img className="message-media-img" key={media.id} src={`http://localhost:1337${media.attributes.url}`} alt={media.attributes.name} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="open-inbox-modal-buttons">
                    <button className='inbox-button-cancel' onClick={() => setShowInboxModal(false)}>Kapat</button>
                </div>
            </div>
        </div>
    );
};

export default OpenInboxModal;
