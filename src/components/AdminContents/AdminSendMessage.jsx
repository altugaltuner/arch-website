import React from 'react';
import "./AdminSendMessage.scss";

function AdminSendMessage() {

    return (
        <div className="admin-send-message-main">
            <div className='admin-send-message-inner'>
                <p>Tüm İletiler</p>
                <p>Gelen Kutusu</p>
                <p>Gönderilenler</p>
                <p>Toplu İleti Gönder</p>
                <p>Özel İleti Gönder</p>
                <p>Çöp Kutusu</p>
            </div>

            <div className='send-message'>

            </div>
        </div>

    );
}

export default AdminSendMessage;