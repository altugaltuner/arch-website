import React, { useState, useRef } from 'react';
import "./SendBulkMessageModal.scss";
import { useAuth } from "../../components/AuthProvider";

function SendBulkMessageModal({ setShowModal, setUpdatedAdminMessages }) {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const messageInputRef = useRef(null);
    const [messageHeader, setMessageHeader] = useState('');
    const [messageFile, setMessageFile] = useState(null);
    const userId = user?.id;

    const handleFileChange = (e) => {
        setMessageFile(e.target.files[0]);
    };

    const handleSend = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            header: messageHeader,
            content: message,
            users_permissions_user: userId,

        }));

        if (messageFile) {
            formData.append('files.contentMedia', messageFile);
        }

        try {
            const response = await fetch('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/multiple-messages', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Mesaj gönderilirken hata oluştu');
            }

            const result = await response.json();
            setUpdatedAdminMessages((prevMessages) => [result.data, ...prevMessages]);
            setShowModal(false);
        } catch (error) {
            console.error('Mesaj gönderme hatası:', error);
        }
    };


    return (
        <div className="send-bulk-message-modal">
            <div className="bulk-message-content">
                <span className="global-close-button" onClick={() => setShowModal(false)}>X</span>
                <h2 className='modal-header'>Toplu Mesaj Gönder</h2>
                <input
                    type="text"
                    className='bulk-message-input-header'
                    placeholder="Mesaj Başlığı"
                    value={messageHeader}
                    onChange={(e) => setMessageHeader(e.target.value)}
                />
                <input
                    ref={messageInputRef}
                    className="bulk-message-input"
                    type="text"
                    placeholder="Mesajınızı buraya yazın"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <input
                    type="file"
                    className='bulk-message-file-input'
                    onChange={handleFileChange}
                />
                <div className="bulk-message-buttons">
                    <button className='bulk-message-cancel' onClick={() => setShowModal(false)}>İptal</button>
                    <button className='bulk-message-send' onClick={handleSend}>Gönder</button>
                </div>
            </div>
        </div>
    );
}

export default SendBulkMessageModal;
