import React, { useState, useEffect } from "react";
import "./OpenInboxModal.scss";

function AboutMePage({ showInboxModal, setShowInboxModal }) {

    if (!showInboxModal) {
        return null;
    }

    return (
        <div className="open-inbox-modal">
            <div className="open-inbox-content">
                <span className="open-inbox-modal-span" onClick={() => setShowInboxModal(false)}>X</span>
                <h2 className='open-inbox-modal-header'>Gelen Kutusu</h2>

                <div className="open-inbox-modal-buttons">
                    <button className='inbox-button-confirm' >Onayla</button>
                    <button className='inbox-button-cancel' onClick={() => setShowInboxModal(false)}>Kapat</button>
                </div>
            </div>
        </div>

    );
};

export default AboutMePage;
