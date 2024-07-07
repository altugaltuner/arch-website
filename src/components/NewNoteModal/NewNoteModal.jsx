import React, { useState } from 'react';
import './NewNoteModal.scss';

function NewNoteModal({ showModal, setShowModal, saveNote }) {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    const handleSave = () => {
        const note = {
            title: noteTitle,
            content: noteContent
        };
        saveNote(note);
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Yeni Not Yaz</h2>
                <input
                    type="text"
                    placeholder="Başlık"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
                <textarea
                    placeholder="İçerik"
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
