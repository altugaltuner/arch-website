import React, { useState } from 'react';
import "./AdminSendMessage.scss";
import AdminSentMessages from "../AdminSentMessages/AdminSentMessages";
import SendBulkMessageModal from '../SendBulkMessageModal/SendBulkMessageModal';

function AdminSendMessage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="admin-send-message-main">
            <div className='admin-send-message-inner'>
                <div className='admin-inbox'>
                    <h3 className='admin-inbox-subheader'>Gelen Kutusu</h3>
                    <AdminSentMessages />
                </div>

                <div className='admin-inbox-for-messages'>
                    <button className='admin-inbox-send-btn' onClick={() => setShowModal(true)}>Toplu İleti Gönder</button>
                </div>
            </div>
            {showModal && <SendBulkMessageModal setShowModal={setShowModal} />}
        </div>
    );
}

export default AdminSendMessage;
