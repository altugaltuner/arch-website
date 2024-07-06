import React, { useEffect, useState } from 'react';
import './ReviseViewModal.scss';

function ReviseViewModal({ isOpen, onClose, revise }) {
    const [text, setText] = useState('');
    const [reviseState, setReviseState] = useState('');
    const [owner, setOwner] = useState('');

    useEffect(() => {
        if (isOpen && revise) {
            setText(revise.text);
            setReviseState(revise.reviseState);
            setOwner(revise.owner);
        }
    }, [isOpen, revise]);

    if (!isOpen) return null;

    return (
        <div className="revise-view-modal">
            <div className="revise-modal-content">
                <h2 className='revise-view-modal-header'>Revize Detayları</h2>
                <div className='revise-view-modal-details'>
                    <p><strong>Revize İçeriği:</strong> {text}</p>
                    <p><strong>Revize Durumu:</strong> {reviseState}</p>
                    <p><strong>Revize Sahibi:</strong> {owner}</p>
                </div>
                <button className='revise-view-close-btn' onClick={onClose}>Kapat</button>
            </div>
        </div>
    );
}

export default ReviseViewModal;
