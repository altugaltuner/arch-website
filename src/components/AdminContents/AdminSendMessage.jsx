import React, { useEffect, useState } from 'react';
import "./AdminSendMessage.scss";
import AdminSentMessages from "../AdminSentMessages/AdminSentMessages";
import SendBulkMessageModal from '../SendBulkMessageModal/SendBulkMessageModal';

const CACHE_DURATION = 15 * 60 * 1000; // 15 dakika

function AdminSendMessage() {
    const [showModal, setShowModal] = useState(false);
    const [updatedAdminMessages, setUpdatedAdminMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const cachedMessages = localStorage.getItem('admin_messages');
            const cachedTimestamp = localStorage.getItem('admin_messages_timestamp');
            if (cachedMessages && cachedTimestamp) {
                const age = Date.now() - parseInt(cachedTimestamp, 10);
                if (age < CACHE_DURATION) {
                    setUpdatedAdminMessages(JSON.parse(cachedMessages));
                    return;
                }
            }

            try {
                const response = await fetch('https://bold-animal-facf707bd9.strapiapp.com/api/multiple-messages/?populate=*');
                if (!response.ok) {
                    throw new Error('Veriler çekilirken hata oluştu');
                }
                const result = await response.json();
                setUpdatedAdminMessages(result.data);
                localStorage.setItem('admin_messages', JSON.stringify(result.data));
                localStorage.setItem('admin_messages_timestamp', Date.now().toString());
            } catch (error) {
                console.error('Hata:', error);
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
