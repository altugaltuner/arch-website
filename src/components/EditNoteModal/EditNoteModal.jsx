import React, { useState, useEffect } from 'react';
import './EditNoteModal.scss';

function EditNoteModal({ showModal, setShowModal, note, updateNote, deleteNote }) {
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

    const handleDelete = () => {
        deleteNote(note.id);
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="edit-note-modal">
            <div className="edit-note-modal-content">
                <h2 className='edit-note-h2'>Notu Düzenle</h2>
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
                <div className="edit-note-button-group">
                    <button className='edit-note-save' onClick={handleSave}>Kaydet</button>
                    <button className='edit-note-cancel' onClick={() => setShowModal(false)}>İptal</button>
                    <button onClick={handleDelete} className="edit-note-delete">Sil</button>
                </div>
            </div>
        </div>
    );
}

export default EditNoteModal;
