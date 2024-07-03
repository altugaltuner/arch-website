import React, { useEffect, useState } from 'react';
import "./AdminSentMessages.scss";

function AdminSentMessages() {
    const [adminMessages, setAdminMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:1337/api/multiple-messages/?populate=*');
                if (!response.ok) {
                    throw new Error('Veriler çekilirken hata oluştu');
                }
                const result = await response.json();
                console.log('Sonuç:', result);
                setAdminMessages(result.data);
            } catch (error) {
                console.error('Hata:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="admin-sent-messages-main">
            {adminMessages.map((message) => (
                <div key={message.id} className="message-item">
                    <h3 className='message-div-title'>{message.attributes.header}</h3>
                    <p className='message-div-content'>{message.attributes.content}</p>
                    <p className='message-div-date'>Tarih: {new Date(message.attributes.createdAt).toLocaleDateString()}</p>
                    <p className='message-div-owner'>Gönderen: {message.attributes.users_permissions_user?.data?.attributes?.username}</p>
                </div>
            ))}
        </div>
    );
}

export default AdminSentMessages;
