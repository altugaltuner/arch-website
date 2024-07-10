import React, { useState } from 'react';
import './PrivateMessageModal.scss';

const PrivateMessageModal = ({ isOpen, onClose, employee, user, onMessageSent }) => {
    const [messageHeader, setMessageHeader] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const [messageMedia, setMessageMedia] = useState(null);

    const handleMediaChange = (e) => {
        setMessageMedia(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('data', JSON.stringify({
            messageTitle: messageHeader,
            messageContent: messageContent,
            recipientID: employee.id,
            users_permissions_user: user.id
        }));
        if (messageMedia) {
            formData.append('files.messageMedia', messageMedia);
        }

        try {
            const response = await fetch('http://localhost:1337/api/private-messages', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            onMessageSent(result.data); // Yeni mesajı gönder ve üst bileşende listeyi güncelle
        } catch (error) {
            console.error("Error sending message:", error);
        }

        onClose(); // Modal kapatma
    };

    if (!isOpen) return null;

    return (
        <div className="priv-modal-overlay">
            <div className="priv-modal-content">
                <h2 className='priv-header'>Yeni Mesaj</h2>
                <form onSubmit={handleSubmit}>
                    <div className="priv-form-group">
                        <label htmlFor="header">Başlık:</label>
                        <input
                            type="text"
                            id="header"
                            value={messageHeader}
                            onChange={(e) => setMessageHeader(e.target.value)}
                            className="priv-input-header"
                        />
                    </div>
                    <div className="priv-form-group">
                        <label htmlFor="content">İçerik:</label>
                        <textarea
                            id="content"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            className="priv-input-content"
                        ></textarea>
                    </div>
                    <div className="priv-form-group">
                        <label htmlFor="media">Medya:</label>
                        <input
                            type="file"
                            id="media"
                            onChange={handleMediaChange}
                            className="priv-input-media"
                        />
                    </div>
                    <button type="submit" className="priv-submit-button">Gönder</button>
                    <button type="button" onClick={onClose} className="priv-close-button">Kapat</button>
                </form>
            </div>
        </div>
    );
};

export default PrivateMessageModal;