import React, { useState, useEffect } from "react";
import "./MyNotebook.scss";
import NewNoteModal from "../NewNoteModal/NewNoteModal";
import EditNoteModal from "../EditNoteModal/EditNoteModal";
import editPencil from "../../assets/icons/edit-pencil.png";

function MyNotebook() {
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await fetch("https://bold-animal-facf707bd9.strapiapp.com/api/users/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Failed to fetch user data");
                    }
                    const data = await response.json();

                    let notebook = [];
                    if (data.myNotebook) {
                        try {
                            notebook = JSON.parse(data.myNotebook);
                        } catch (e) {
                            console.error("Error parsing myNotebook JSON:", e);
                        }
                    }
                    setNotes(Array.isArray(notebook) ? notebook : []);
                    setUserId(data.id);
                } else {
                    console.error("No token found");
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);

    const saveNote = async (note) => {
        try {
            const token = localStorage.getItem("token");
            if (!token || !userId) {
                throw new Error("No token or user ID found");
            }

            const updatedNotes = [...notes, note];
            setNotes(updatedNotes);

            const response = await fetch(`https://bold-animal-facf707bd9.strapiapp.com/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ myNotebook: JSON.stringify(updatedNotes) }),
            });

            if (!response.ok) {
                throw new Error("Notebook update failed");
            }

            const data = await response.json();
        } catch (error) {
            console.error("Error updating notebook:", error);
        }
    };

    const updateNote = async (updatedNote) => {
        try {
            const token = localStorage.getItem("token");
            if (!token || !userId) {
                throw new Error("No token or user ID found");
            }

            const updatedNotes = notes.map(note =>
                note.id === updatedNote.id ? updatedNote : note
            );
            setNotes(updatedNotes);

            const response = await fetch(`https://bold-animal-facf707bd9.strapiapp.com/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ myNotebook: JSON.stringify(updatedNotes) }),
            });

            if (!response.ok) {
                throw new Error("Notebook update failed");
            }

            const data = await response.json();
        } catch (error) {
            console.error("Error updating notebook:", error);
        }
    };

    const deleteNote = async (noteId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token || !userId) {
                throw new Error("No token or user ID found");
            }

            const updatedNotes = notes.filter(note => note.id !== noteId);
            setNotes(updatedNotes);

            const response = await fetch(`https://bold-animal-facf707bd9.strapiapp.com/api/users/${userId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ myNotebook: JSON.stringify(updatedNotes) }),
            });

            if (!response.ok) {
                throw new Error("Notebook update failed");
            }

            const data = await response.json();
        } catch (error) {
            console.error("Error updating notebook:", error);
        }
    };

    const handleEditClick = (note) => {
        setSelectedNote(note);
        setShowEditModal(true);
    };

    return (
        <div className="my-notebook-main">
            <h2 className="div-header">Not Defterim</h2>
            <button className="yellow-button" onClick={() => setShowModal(true)}>
                Yeni Not Yaz
            </button>
            <div className="notebook-notes-area">
                {notes.map((note, index) => (
                    <div className="note-div" key={index}>
                        <h3 className="note-one-subheader">{note.title}</h3>
                        <p className="note-one-subnote">{note.content}</p>
                        <img
                            src={editPencil}
                            alt="Edit"
                            className="edit-icon"
                            onClick={() => handleEditClick(note)}
                        />
                    </div>
                ))}
            </div>
            <NewNoteModal showModal={showModal} setShowModal={setShowModal} saveNote={saveNote} />
            <EditNoteModal
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                note={selectedNote}
                updateNote={updateNote}
                deleteNote={deleteNote}
            />
        </div>
    );
}

export default MyNotebook;
