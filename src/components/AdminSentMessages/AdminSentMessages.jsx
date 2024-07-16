import React from 'react';
import "./AdminSentMessages.scss";

function AdminSentMessages({ adminMessages }) {
    return (
        <div className="admin-sent-messages-main">
            {adminMessages.map((message) => {
                const contentMedia = message.attributes.contentMedia;
                const mediaUrl = contentMedia && contentMedia.data && contentMedia.data[0]
                    ? (contentMedia.data[0].attributes.formats && contentMedia.data[0].attributes.formats.thumbnail
                        ? contentMedia.data[0].attributes.formats.medium.url
                        : contentMedia.data[0].attributes.url)
                    : null;

                return (
                    <div key={message.id} className="message-item">
                        <h3 className='message-div-title'>{message?.attributes?.header}</h3>
                        <p className='message-div-content'>{message?.attributes?.content}</p>
                        {mediaUrl && <img src={`http://localhost:1337${mediaUrl}`} className='message-div-media' alt='message-media'></img>}
                        <p className='message-div-date'>Tarih: {new Date(message.attributes.createdAt).toLocaleString()}</p>
                        <p className='message-div-owner'>Gönderen: {message.attributes.users_permissions_user?.data?.attributes?.username}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default AdminSentMessages;
