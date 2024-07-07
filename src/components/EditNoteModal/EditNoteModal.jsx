import React, { useState, useEffect } from 'react';
import './EditNoteModal.scss';

function EditNoteModal({ showModal, setShowModal, note, updateNote }) {
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');

    useEffect(() => {
        if (note) {
            setNoteTitle(note.title);
            setNoteContent(note.content);
        }
    }, [note]);

    const handleSave = () => {
        const updatedNote = {
            ...note,
            title: noteTitle,
            content: noteContent
        };
        updateNote(updatedNote);
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Notu Düzenle</h2>
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

export default EditNoteModal;
