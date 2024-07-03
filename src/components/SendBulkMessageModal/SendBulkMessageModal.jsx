import React, { useState, useRef } from 'react';
import "./SendBulkMessageModal.scss";
import { useAuth } from "../../components/AuthProvider";

function SendBulkMessageModal({ setShowModal }) {
    const [message, setMessage] = useState('');
    const messageInputRef = useRef(null);
    const [messageHeader, setMessageHeader] = useState('');
    const [messageFile, setMessageFile] = useState(null); // Dosya objesi olarak saklayacağız

    const { user } = useAuth();
    console.log(user);
    const userId = user?.id; // Kullanıcı ID'sini alın

    const handleFileChange = (e) => {
        setMessageFile(e.target.files[0]); // Dosya objesini set ediyoruz
    };

    const handleSend = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            header: messageHeader,
            content: message,
            users_permissions_user: userId // Kullanıcı ID'sini gönderiyoruz
        }));

        if (messageFile) {
            formData.append('files.contentMedia', messageFile); // Dosyayı ekliyoruz
        }

        try {
            const response = await fetch('http://localhost:1337/api/multiple-messages', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Mesaj gönderilirken hata oluştu');
            }

            const result = await response.json();
            console.log('Mesaj başarıyla gönderildi:', result);
            setShowModal(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="send-bulk-message-modal">
            <div className="bulk-message-content">
                <span className="bulk-message-close" onClick={() => setShowModal(false)}>X</span>
                <h2 className='bulk-message-header'>Toplu Mesaj Gönder</h2>
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
