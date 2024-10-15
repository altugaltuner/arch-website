import React, { useState } from 'react';
import axios from 'axios';
import './CreateEventModal.scss';
import { useAuth } from "../../components/AuthProvider";

const CreateEventModal = ({ selectedDate, onClose, addEvent }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [errors, setErrors] = useState({});

    const { user } = useAuth();
    const userId = user ? user.id : null;
    const userCompany = user ? user.company.id : null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationErrors = {};
        if (!title) validationErrors.title = "Başlık gerekli";
        if (!description) validationErrors.description = "Açıklama gerekli";
        if (!time) validationErrors.time = "Saat gerekli";
        if (!location) validationErrors.location = "Yer gerekli";

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const eventDate = new Date(selectedDate);
        const [hours, minutes] = time.split(':');
        eventDate.setHours(hours);
        eventDate.setMinutes(minutes);

        try {
            const response = await axios.post('https://wonderful-pleasure-64045d06ec.strapiapp.com/api/calendar-events', {
                data: {
                    title,
                    description,
                    date: eventDate.toISOString(),
                    eventLocation: location,
                    company: userCompany,
                    users_permissions_user: userId,
                },
            });
            addEvent(response.data.data);
            onClose();
        } catch (error) {
        }
        onClose();
    };

    return (
        <div className="create-event-modal">
            <div className="create-event-modal-content">
                <header className="modal-header">
                    Etkinlik Oluştur - {selectedDate.toLocaleDateString("tr-TR")}
                </header>
                <form className="create-event-modal-body" onSubmit={handleSubmit}>
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
                    <label>
                        Yer:
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        {errors.location && <p className="error-message">{errors.location}</p>}
                    </label>
                    <footer className="create-event-modal-footer">
                        <button className='cancel-button' type="button" onClick={onClose}>İptal</button>
                        <button className='confirm-button' type="submit">Oluştur</button>
                    </footer>
                </form>
            </div>
        </div>
    );
};

export default CreateEventModal;
