import React, { useEffect, useState } from 'react';
import "./AdminSendMessage.scss";
import AdminSentMessages from "../AdminSentMessages/AdminSentMessages";
import SendBulkMessageModal from '../SendBulkMessageModal/SendBulkMessageModal';

function AdminSendMessage() {
    const [showModal, setShowModal] = useState(false);
    const [updatedAdminMessages, setUpdatedAdminMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/multiple-messages/?populate=*');
                if (!response.ok) {
                    throw new Error('Veriler çekilirken hata oluştu');
                }
                const result = await response.json();
                setUpdatedAdminMessages(result.data);
            } catch (error) {
            }
        };

        fetchMessages();
    }, []);

    return (
        <div className="admin-send-message-main">
            <div className='admin-send-message-inner'>
                <div className='admin-inbox'>
                    <h3 className='admin-inbox-subheader'>Gelen Kutusu</h3>
                    <AdminSentMessages adminMessages={updatedAdminMessages} />
                </div>

                <div className='admin-inbox-for-messages'>
                    <button className='admin-inbox-send-btn' onClick={() => setShowModal(true)}>Toplu İleti Gönder</button>
                </div>
            </div>
            {showModal && <SendBulkMessageModal setShowModal={setShowModal} setUpdatedAdminMessages={setUpdatedAdminMessages} />}
        </div>
    );
}

export default AdminSendMessage;
