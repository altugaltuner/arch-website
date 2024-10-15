import React, { useState } from "react";
import { useAuth } from "../AuthProvider";

const SendMessage = () => {
    const [value, setValue] = useState("");
    const { currentUser } = useAuth();
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (value.trim === "") {
            alert("Enter valid message!");
            return;
        }
        try {
            const { displayName, photoURL } = currentUser;
            if (currentUser) {
                fetch("https://wonderful-pleasure-64045d06ec.strapiapp.com/api/chat-room-messages", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: {
                            message: value,
                            User: displayName,
                            Photo: photoURL,
                        },
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => console.log(data));
            }
        } catch (error) {
        }
        setValue("");
        setDisplayName(displayName);
        setPhotoURL(photoURL);

    };
    return (
        <div className="bg-gray-200 fixed w-full py-10 shadow-lg bottom-0">
            <form onSubmit={handleSendMessage} className="container flex px-2">
                <input
                    className="input w-full focus:outline-none bg-gray-100 rounded-r-none"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button className="w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm">
                    Send
                </button>
            </form>
        </div>
    );
};
export default SendMessage;