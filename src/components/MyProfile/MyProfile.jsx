import React, { useState, useEffect } from "react";
import "./MyProfile.scss";

function MyProfile({ user }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        profilePic: "",
        name: "",
        location: "",
        mobilePhone: "",
        email: "",
        social1: "",
    });
    const [savedData, setSavedData] = useState(formData);

    useEffect(() => {
        if (user) {
            const initialData = {
                profilePic: user.profilePic || "",
                name: user.username || "",
                location: user.UserLocation || "",
                mobilePhone: user.MobilePhone || "",
                email: user.email || "",
                social1: user.socialMedia || ""
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

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prevData) => ({ ...prevData, profilePic: reader.result }));
        };
        reader.readAsDataURL(file);
    };


    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            {isEditing ? (
                <form className="profile-form" onSubmit={handleSave}>
                    <div className="profile-image">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                        />
                        <img className="profile-pic" src={formData.profilePic} alt="Profile" />
                    </div>

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
                        <label htmlFor="email">E-posta</label>
                        <input
                            className="input-for-labels"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="E-posta adresiniz"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile-field">
                        <label htmlFor="mobilePhone">Telefon</label>
                        <input
                            className="input-for-labels"
                            type="tel"
                            id="mobilePhone"
                            name="mobilePhone"
                            placeholder="Telefon numaranız"
                            value={formData.mobilePhone}
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
                        <label htmlFor="social1">Sosyal Medya</label>
                        <input
                            className="input-for-labels"
                            type="text"
                            id="social1"
                            name="social1"
                            placeholder="Link to social profile"
                            value={formData.social1}
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
                    <div className="profile-image">
                        <img className="profile-pic" src={`http://localhost:1337${savedData.profilePic.url}`} alt="Profile" />
                    </div>
                    <div className="profile-field">
                        <label className="profile-field-labels">İsim Soyisim:</label>
                        <p className="profile-field-paragraph">{savedData.name}</p>
                    </div>
                    <div className="profile-field">
                        <label className="profile-field-labels">E-posta:</label>
                        <p className="profile-field-paragraph">{savedData.email}</p>
                    </div>
                    <div className="profile-field">
                        <label className="profile-field-labels">Telefon:</label>
                        <p className="profile-field-paragraph">{savedData.mobilePhone}</p>
                    </div>
                    <div className="profile-field">
                        <label className="profile-field-labels">Konum:</label>
                        <p className="profile-field-paragraph">{savedData.location}</p>
                    </div>
                    <div className="profile-field-social">
                        <label className="profile-field-labels">Sosyal Medya:</label>
                        <p className="profile-field-paragraph">{savedData.social1}</p>
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
