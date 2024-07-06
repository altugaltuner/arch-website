import React, { useState, useEffect } from "react";
import "./MyNotebook.scss";
import NewNoteModal from "../NewNoteModal/NewNoteModal";

function MyNotebook() {
    const [notes, setNotes] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Token retrieved:", token);
                if (token) {
                    const response = await fetch("http://localhost:1337/api/users/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Failed to fetch notes");
                    }
                    const data = await response.json();
                    setNotes(data.myNotebook || []);
                }
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);

    const saveNote = async (noteContent) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found");
            }

            const updatedNotes = [...notes, noteContent];
            setNotes(updatedNotes);

            const response = await fetch("http://localhost:1337/api/users/me", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ myNotebook: updatedNotes }),
            });

            if (!response.ok) {
                throw new Error("Notebook update failed");
            }

            const data = await response.json();
            console.log("Notebook updated successfully", data);
        } catch (error) {
            console.error("Error updating notebook:", error);
        }
    };

    return (
        <div className="my-notebook-main">
            <h2 className="my-notebook-note-header">Not Defterim</h2>
            <button className="note-button" onClick={() => setShowModal(true)}>
                Yeni Not Yaz
            </button>
            <div className="notebook-notes-area">
                {notes.map((note, index) => (
                    <div className="note-div" key={index}>
                        <h3 className="note-one-subheader">Not {index + 1}</h3>
                        <p className="note-one-subnote">{note}</p>
                    </div>
                ))}
            </div>
            <NewNoteModal showModal={showModal} setShowModal={setShowModal} saveNote={saveNote} />
        </div>
    );
}

export default MyNotebook;
