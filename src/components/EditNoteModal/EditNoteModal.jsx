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
                <span className='global-close-button' onClick={() => setShowModal(false)}>X</span>
                <h2 className='modal-header'>Notu Düzenle</h2>
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
                    <button className='confirm-button' onClick={handleSave}>Kaydet</button>
                    <button className='yellow-button' onClick={() => setShowModal(false)}>İptal</button>
                    <button onClick={handleDelete} className="cancel-button">Sil</button>
                </div>
            </div>
        </div>
    );
}

export default EditNoteModal;
