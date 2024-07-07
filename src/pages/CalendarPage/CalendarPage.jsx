import React, { useState } from "react";
import "./CalendarPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import CalendarModal from "../../components/CalendarModal/CalendarModal";

const daysOfWeek = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

const generateCalendar = (year, month) => {
    const date = new Date(year, month, 1);
    const dates = [];
    while (date.getMonth() === month) {
        dates.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return dates;
};

const CalendarPage = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const calendarDates = generateCalendar(year, month);

    const openModal = (date) => {
        setSelectedDate(date);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedDate(null);
        setModalOpen(false);
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

    return (
        <main className="calendar-page-main">
            <Navigation />
            <div className="calendar-page-inner">
                <div className="calendar-page-header-and-input">
                    <h1 className="calendar-page-header">Takvim</h1>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Grup Ara"
                        value=""
                    />
                </div>
                <div className="calendar-page-controls">
                    <button onClick={prevMonth}>Önceki Ay</button>
                    <span>{year} - {month + 1}</span>
                    <button onClick={nextMonth}>Sonraki Ay</button>
                </div>
                <div className="calendar-area">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="calendar-day-header">{day}</div>
                    ))}
                    {calendarDates.map((date) => (
                        <div key={date.toDateString()} className="calendar-day" onClick={() => openModal(date)}>
                            {date.getDate()}
                        </div>
                    ))}
                </div>
                {modalOpen && <CalendarModal date={selectedDate} onClose={closeModal} />}
            </div>
        </main>
    );
};

export default CalendarPage;
