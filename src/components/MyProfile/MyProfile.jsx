import React, { useState, useEffect } from "react";
import "./MyProfile.scss";
import { useAuth } from "../../components/AuthProvider";
import profilePic from "../../assets/pp.jpg";

function MyProfile({ user }) {
    const auth = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        social1: "",
        social2: "",
        social3: "",
        social4: ""
    });
    const [savedData, setSavedData] = useState(formData);

    useEffect(() => {
        if (user) {
            const initialData = {
                name: user.username || "",
                location: user.location || "",
                social1: user.social1 || "",
                social2: user.social2 || "",
                social3: user.social3 || "",
                social4: user.social4 || ""
            };
            setFormData(initialData);
            setSavedData(initialData);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSavedData(formData);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFormData(savedData);
        setIsEditing(false);
    };

    const handleLogout = () => {
        window.location.href = "/login";
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <div className="profile-image">
                <img className="profile-pic" src={profilePic} alt="Profile" />
            </div>
            {isEditing ? (
                <form className="profile-form" onSubmit={handleSave}>
                    <div className="profile-field">
                        <label htmlFor="name">İsim Soyisim</label>
                        <input
                            className="input-for-labels"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="İsminiz"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="location">Konum</label>
                        <input
                            className="input-for-labels"
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile-field-social">
                        <label>Sosyal Medya Hesaplarım</label>
                        <input
                            className="input-for-labels"
                            type="text"
                            name="social1"
                            placeholder="Link to social profile"
                            value={formData.social1}
                            onChange={handleChange}
                        />
                        <input
                            className="input-for-labels"
                            type="text"
                            name="social2"
                            placeholder="Link to social profile"
                            value={formData.social2}
                            onChange={handleChange}
                        />
                        <input
                            className="input-for-labels"
                            type="text"
                            name="social3"
                            placeholder="Link to social profile"
                            value={formData.social3}
                            onChange={handleChange}
                        />
                        <input
                            className="input-for-labels"
                            type="text"
                            name="social4"
                            placeholder="Link to social profile"
                            value={formData.social4}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile-buttons">
                        <button className="my-profile-submit" type="submit">
                            Kaydet
                        </button>
                        <button className="my-profile-cancel" type="button" onClick={handleCancel}>
                            İptal Et
                        </button>
                    </div>
                </form>
            ) : (
                <div className="profile-info">
                    <div className="profile-field">
                        <label className="profile-field-labels">İsim Soyisim:</label>
                        <p className="profile-field-paragraph">{savedData.name}</p>
                    </div>
                    <div className="profile-field">
                        <label className="profile-field-labels">Konum:</label>
                        <p className="profile-field-paragraph">{savedData.location}</p>
                    </div>
                    <div className="profile-field-social">
                        <label className="profile-field-labels">Sosyal Medya Hesaplarım:</label>
                        <p className="profile-field-paragraph">{savedData.social1}</p>
                        <p className="profile-field-paragraph">{savedData.social2}</p>
                        <p className="profile-field-paragraph">{savedData.social3}</p>
                        <p className="profile-field-paragraph">{savedData.social4}</p>
                    </div>
                    <div className="buttons-for-profile-section">
                        <button className="my-profile-edit" type="button" onClick={handleEdit}>
                            Değiştir
                        </button>
                        <button className="my-profile-logout" type="button" onClick={handleLogout}>
                            Çıkış Yap
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyProfile;
