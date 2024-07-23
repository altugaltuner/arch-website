import React, { useState, useMemo } from 'react';
import './MaterialCalendar.scss';

const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

const generateCalendar = (year, month) => {
    const date = new Date(year, month, 1);
    const dates = [];
    // Prepend days of the previous month
    for (let i = 0; i < date.getDay(); i++) {
        dates.push(null);
    }
    while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    // Append days of the next month
    while (dates.length % 7 !== 0) {
        dates.push(null);
    }
    return dates;
};

const MaterialCalendar = ({ selectedDate, setSelectedDate }) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const calendarDates = useMemo(() => generateCalendar(year, month), [year, month]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const nextMonth = () => {
        setMonth((prev) => (prev + 1) % 12);
        if (month === 11) {
            setYear((prev) => prev + 1);
        }
    };

    const prevMonth = () => {
        setMonth((prev) => (prev === 0 ? 11 : prev - 1));
        if (month === 0) {
            setYear((prev) => prev - 1);
        }
    };

    const today = new Date();

    return (
        <div className="material-calendar">
            <h3 className="material-calendar-subheader">Gün Seçin</h3>
            <div className="calendar-controls">
                <button onClick={prevMonth}>Önceki</button>
                <span>{year} - {month + 1}</span>
                <button onClick={nextMonth}>Sonraki</button>
            </div>
            <div className="calendar">
                {daysOfWeek.map((day) => (
                    <div key={day} className="calendar-day-header">{day}</div>
                ))}
                {calendarDates.map((date, index) => (
                    <div
                        key={index}
                        className={`calendar-day ${date ? 'valid' : 'invalid'} ${date && date.toDateString() === today.toDateString() ? 'today' : ''}`}
                        onClick={() => date && handleDateClick(date)}
                    >
                        {date ? date.getDate() : ''}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MaterialCalendar;
