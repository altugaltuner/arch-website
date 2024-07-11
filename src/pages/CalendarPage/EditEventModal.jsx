import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditEventModal.scss';

const EditEventModal = ({ event, onClose, updateEvent, deleteEvent }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (event) {
            setTitle(event.attributes.title);
            setDescription(event.attributes.description);
            const eventDate = new Date(event.attributes.date);
            setTime(eventDate.toISOString().substring(11, 16)); // HH:MM formatında
        }
    }, [event]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationErrors = {};
        if (!title) validationErrors.title = "Başlık gerekli";
        if (!description) validationErrors.description = "Açıklama gerekli";
        if (!time) validationErrors.time = "Saat gerekli";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const eventDate = new Date(event.attributes.date);
        const [hours, minutes] = time.split(':');
        eventDate.setHours(hours);
        eventDate.setMinutes(minutes);

        try {
            const response = await axios.put(`http://localhost:1337/api/calendar-events/${event.id}`, {
                data: {
                    title,
                    description,
                    date: eventDate.toISOString(),
                },
            });
            updateEvent(response.data.data);
            onClose();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:1337/api/calendar-events/${event.id}`);
            deleteEvent(event.id);
            onClose();
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="edit-event-modal">
            <div className="edit-event-modal-content">
                <header className="edit-event-modal-header">
                    Etkinliği Düzenle
                </header>
                <form className="edit-event-modal-body" onSubmit={handleSubmit}>
                    <label>
                        Başlık:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <p className="error-message">{errors.title}</p>}
                    </label>
                    <label>
                        Açıklama:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && <p className="error-message">{errors.description}</p>}
                    </label>
                    <label>
                        Saat:
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                        {errors.time && <p className="error-message">{errors.time}</p>}
                    </label>
                    <footer className="edit-event-modal-footer">
                        <button type="button" onClick={onClose}>İptal</button>
                        <button type="button" className="delete-button" onClick={handleDelete}>Sil</button>
                        <button type="submit">Güncelle</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default EditEventModal;
