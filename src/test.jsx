import React, { useEffect, useState } from 'react';
import "./AdminSendMessage.scss";
import { adminMessages } from "../AdminSentMessages/AdminSentMessages";

function AdminSendMessage() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(adminMessages);
    }, []);

    return (
        <div className="admin-send-message-main">
            <div className='admin-send-message-inner'>
                <div className='admin-inbox'>
                    <h3 className='admin-inbox-subheader'>Gönderilenler</h3>
                    <ul className='messages-sent-by-admin-ul'>
                        {messages.map((message, index) => (
                            <li key={index} className='messages-sent-by-admin-li'>
                                <div className='message-div'>
                                    <h4>{message.title}</h4>
                                    <p>{message.content}</p>
                                    <span>{message.date}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='admin-inbox'>
                    <h3 className='admin-inbox-subheader'>Toplu İleti Gönder</h3>
                </div>
                <div className='admin-inbox'>
                    <h3 className='admin-inbox-subheader'>Çöp Kutusu</h3>
                </div>
            </div>

            <div className='admin-send-message-input-div'>
                <input className='send-input' type="text" value="" placeholder='Çalışanlara ileti gönder' />
            </div>
        </div>
    );
}

export default AdminSendMessage;
