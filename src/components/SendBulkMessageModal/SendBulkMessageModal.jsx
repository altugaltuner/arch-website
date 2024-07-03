import React from 'react';
import "./SendBulkMessageModal.scss";

function SendBulkMessageModal({ setShowModal }) {
    return (
        <div className="send-bulk-message-modal">
            <div className="bulk-message-content">
                <span className="bulk-message-close" onClick={() => setShowModal(false)}>X</span>
                <h2 className='bulk-message-header'>Toplu Mesaj Gönder</h2>
                <input
                    className="bulk-message-input"
                    type="text"
                    placeholder="Mesajınızı buraya yazın"
                />
                <div className="bulk-message-buttons">
                    <button className='bulk-message-cancel' onClick={() => setShowModal(false)}>İptal</button>
                    <button className='bulk-message-send'>Gönder</button>
                </div>
            </div>
        </div>
    );
}

export default SendBulkMessageModal;
