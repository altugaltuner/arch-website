import React, { useEffect, useState } from 'react';
import "./AdminSendMessage.scss";
import AdminSentMessages from "../AdminSentMessages/AdminSentMessages"; // Doğru import
import dustbinLogo from "../../assets/icons/delete-icon.png";
import SendBulkMessageModal from '../SendBulkMessageModal/SendBulkMessageModal';

function AdminSendMessage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="admin-send-message-main">
            <div className='admin-send-message-inner'>
                <div className='admin-inbox'>
                    <h3 className='admin-inbox-subheader'>Gönderilenler</h3>
                    <AdminSentMessages /> {/* Burada adminMessages yerine bileşeni render ediyoruz */}
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
