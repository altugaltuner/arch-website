import React from 'react';

const MaterialCalendar = ({ selectedDate, setSelectedDate }) => {
    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="material-calendar">
            <h3 className="material-calendar-subheader">Gün Seçin</h3>
            <div className="calendar">
                {/* Takvim bileşeni burada yer alacak */}
                {/* Takvim komponentinizin her bir gününe tıklama olayını bağlayın */}
                {[...Array(31).keys()].map(day => (
                    <div
                        key={day}
                        onClick={() => handleDateClick(day + 1)}
                        className={`calendar-day ${selectedDate === day + 1 ? 'selected' : ''}`}
                    >
                        {day + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MaterialCalendar;
