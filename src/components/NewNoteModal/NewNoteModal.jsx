import React, { useState } from 'react';
import './NewNoteModal.scss';

function NewNoteModal({ showModal, setShowModal, saveNote }) {
    const [noteContent, setNoteContent] = useState('');

    const handleSave = () => {
        saveNote(noteContent);
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Yeni Not Yaz</h2>
                <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                />
                <button onClick={handleSave}>Kaydet</button>
                <button onClick={() => setShowModal(false)}>İptal</button>
            </div>
        </div>
    );
}

export default NewNoteModal;
