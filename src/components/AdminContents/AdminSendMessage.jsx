import React, { useEffect, useState } from 'react';
import "./AdminSendMessage.scss";
import { adminMessages } from "../AdminSentMessages/AdminSentMessages";
import dustbinLogo from "../../assets/icons/delete-icon.png";
import SendBulkMessageModal from '../SendBulkMessageModal/SendBulkMessageModal';

function AdminSendMessage() {
    const [messages, setMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);

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
                                    <h4 className='message-div-title'>{message.title}</h4>
                                    <p className='message-div-content'>{message.content}</p>
                                    <span className='message-div-date'>{message.date}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='admin-inbox-for-messages'>
                    <button className='admin-inbox-send-btn' onClick={() => setShowModal(true)}>Toplu İleti Gönder</button>
                    <div className='dustbin-for-admin-mails'>
                        <h3 className='admin-inbox-subheader'>Çöp Kutusu</h3>
                        <img className='admin-dustbin-email' src={dustbinLogo} alt="dustbin-logo" />
                    </div>
                </div>
            </div>
            {showModal && <SendBulkMessageModal setShowModal={setShowModal} />}
        </div>
    );
}

export default AdminSendMessage;
