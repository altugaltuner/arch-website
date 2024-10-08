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
        <div className="new-note-modal">
            <div className="new-note-modal-content">
                <span className='global-close-button' onClick={() => setShowModal(false)}>X</span>
                <h2 className='modal-header'>Yeni Not Yaz</h2>
                <input
                    className='note-title-input'
                    type="text"
                    placeholder="Başlık"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
                <textarea
                    className='note-content-input'
                    placeholder="Not İçeriği"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                />
                <div className='btn-div-for-new-note'>
                    <button className='confirm-button' onClick={handleSave}>Kaydet</button>
                    <button className='cancel-button' onClick={() => setShowModal(false)}>İptal</button>
                </div>
            </div>
        </div>
    );
}

export default NewNoteModal;
