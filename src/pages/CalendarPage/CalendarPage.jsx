import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import "./CalendarPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import CreateEventModal from "./CreateEventModal";
import EditEventModal from "./EditEventModal";
import { useAuth } from "../../components/AuthProvider";
import backButton from "../../assets/icons/back-button.png";
import forwardButton from "../../assets/icons/forward-button.png";

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
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [selectedDayEvents, setSelectedDayEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const calendarDates = useMemo(() => generateCalendar(year, month), [year, month]);
    const { user } = useAuth();
    const userRole = user && user.access ? user.access.role : null;
    const userCompany = user ? user.company.id : null;

    const fetchEvents = useCallback(async () => {
        try {
            const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/calendar-events/?populate=*');
            const allEvents = response.data.data;
            setEvents(allEvents);
            const companyEvents = allEvents?.filter(event => event.attributes.company.data.id === userCompany);
            setFilteredEvents(companyEvents);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }, [userCompany]);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const handleDateClick = useCallback((date) => {
        setSelectedDate(date);
        const dayEvents = filteredEvents?.filter(event => {
            const eventDate = new Date(event.attributes.date);
            return eventDate.toDateString() === date.toDateString();
        });
        setSelectedDayEvents(dayEvents);
    }, [filteredEvents]);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openEditModal = (event) => {
        setEventToEdit(event);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setEditModalOpen(false);
    };

    const addEvent = useCallback((newEvent) => {
        setEvents(prevEvents => [...prevEvents, newEvent]);
        if (newEvent.attributes.company.data.id === userCompany) {
            setFilteredEvents(prevFilteredEvents => [...prevFilteredEvents, newEvent]);
            if (new Date(newEvent.attributes.date).toDateString() === selectedDate?.toDateString()) {
                setSelectedDayEvents(prevSelectedDayEvents => [...prevSelectedDayEvents, newEvent]);
            }
        }
    }, [selectedDate, userCompany]);

    const updateEvent = useCallback((updatedEvent) => {
        setEvents(prevEvents => prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
        setFilteredEvents(prevFilteredEvents => prevFilteredEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
        if (new Date(updatedEvent.attributes.date).toDateString() === selectedDate?.toDateString()) {
            setSelectedDayEvents(prevSelectedDayEvents => prevSelectedDayEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
        }
    }, [selectedDate]);

    const deleteEvent = useCallback((eventId) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        setFilteredEvents(prevFilteredEvents => prevFilteredEvents.filter(event => event.id !== eventId));
        setSelectedDayEvents(prevSelectedDayEvents => prevSelectedDayEvents.filter(event => event.id !== eventId));
    }, []);

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
        <main className="calendar-page-main">
            <Navigation />
            <div className="calendar-page-inner">
                <div className="calendar-page-header-and-input">
                    <h1 className="calendar-page-header">Takvim</h1>
                </div>
                <div className="calendar-page-controls">
                    <img className="calendar-page-button" onClick={prevMonth} src={backButton} alt="Geri" />
                    <span>{year} - {month + 1}</span>
                    <img className="calendar-page-button" onClick={nextMonth} src={forwardButton} alt="İleri" />
                </div>
                <div className="calendar-area">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="calendar-day-header">{day}</div>
                    ))}
                    {calendarDates.map((date) => {
                        const eventDateString = date.toDateString();
                        const hasEvent = filteredEvents.some(event => {
                            const eventDate = new Date(event.attributes.date);
                            return eventDate.toDateString() === eventDateString;
                        });

                        const isToday = date.toDateString() === today.toDateString();

                        return (
                            <div
                                key={date.toDateString()}
                                className={`calendar-day ${selectedDate && selectedDate.toDateString() === date.toDateString() ? 'selected' : ''} ${hasEvent ? 'event-day' : ''} ${isToday ? 'today' : ''}`}
                                onClick={() => handleDateClick(date)}
                            >
                                {date.getDate()}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="calendar-page-events-div">
                {selectedDate ? (
                    <div className="calendar-page-events-inner-div">
                        <h2 className="calendar-page-subheader">
                            {selectedDate.toLocaleString("tr-TR", { weekday: 'long' })} - {selectedDate.toLocaleDateString("tr-TR")}
                        </h2>
                        {userRole === "Admin" && (
                            <button className="create-event-calendar" onClick={openModal}>Etkinlik Oluştur</button>
                        )}
                        <div className="selected-day-event-inner">
                            {selectedDayEvents.length > 0 ? (
                                selectedDayEvents.map(event => (
                                    <div className="calendar-one-event" key={event.id}>
                                        <h3 className="one-event-subheader">{event.attributes.title}</h3>
                                        <p className="events-header-date">Tarih ve Saat:
                                            {new Date(event.attributes.date).toLocaleString("tr-TR")}
                                        </p>
                                        <p className="events-header-date">Yer: {event.attributes.eventLocation}</p>
                                        <p className="events-paragraph">{event.attributes.description}</p>
                                        {(userRole === "Admin" || user.id === event.attributes.users_permissions_user.data.id) && (
                                            <button className="edit-event-calendar" onClick={() => openEditModal(event)}>Düzenle</button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p className="no-event-p">Bu gün için planlanan etkinlik yok.</p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="calendar-page-events-inner-div">
                        <p className="calendar-page-subheader">Takvim üzerinden gün seçiniz.</p>
                    </div>
                )}
            </div>
            {modalOpen && (
                <CreateEventModal
                    selectedDate={selectedDate}
                    onClose={closeModal}
                    addEvent={addEvent}
                />
            )}
            {editModalOpen && eventToEdit && (
                <EditEventModal
                    event={eventToEdit}
                    onClose={closeEditModal}
                    updateEvent={updateEvent}
                    deleteEvent={deleteEvent}
                />
            )}
        </main>
    );
};

export default CalendarPage;
