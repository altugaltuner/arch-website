import React from "react";
import "./CalendarModal.scss";

const CalendarModal = ({ date, onClose }) => {
    const dayName = date.toLocaleString("tr-TR", { weekday: 'long' });

    return (
        <div className="calendar-modal">
            <div className="calendar-modal-content">
                <header className="calendar-modal-header">
                    {dayName} - {date.toLocaleDateString("tr-TR")}
                </header>
                <div className="calendar-modal-body">
                    {/* Etkinlikler burada listelenecek */}
                    <p>Planlanan etkinlikler burada yer alacak.</p>
                </div>
                <footer className="calendar-modal-footer">
                    <button onClick={onClose}>Kapat</button>
                </footer>
            </div>
        </div>
    );
};

export default CalendarModal;
