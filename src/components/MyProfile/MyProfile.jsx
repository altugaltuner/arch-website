import React, { useState } from "react";
import "./MyProfile.scss";
import { useAuth } from "../../components/AuthProvider";
import profilePic from "../../assets/pp.jpg";

function MyProfile() {
    const auth = useAuth();

    const initialData = {
        name: "",
        bio: "",
        location: "",
        website: "",
        social1: "",
        social2: "",
        social3: "",
        social4: ""
    };

    const [isEditing, setIsEditing] = useState(true); // Initially in edit mode
    const [formData, setFormData] = useState(initialData);
    const [savedData, setSavedData] = useState(initialData); // To keep track of saved data

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSavedData(formData); // Save the current form data
        setIsEditing(false); // Switch to view mode
    };

    const handleEdit = () => {
        setIsEditing(true); // Switch back to edit mode
    };

    const handleCancel = () => {
        setFormData(savedData); // Revert to saved data
        setIsEditing(false); // Switch to view mode
    };

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
                        <label htmlFor="bio">Biyografi</label>
                        <textarea
                            className="biography-area"
                            id="bio"
                            name="bio"
                            placeholder="biyografiniz"
                            value={formData.bio}
                            onChange={handleChange}
                        ></textarea>
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
                    <div className="profile-field">
                        <label htmlFor="website">Website</label>
                        <input
                            className="input-for-labels"
                            type="text"
                            id="website"
                            name="website"
                            value={formData.website}
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
                        <label>İsim Soyisim:</label>
                        <p>{savedData.name}</p>
                    </div>
                    <div className="profile-field">
                        <label>Biyografi:</label>
                        <p>{savedData.bio}</p>
                    </div>
                    <div className="profile-field">
                        <label>Konum:</label>
                        <p>{savedData.location}</p>
                    </div>
                    <div className="profile-field">
                        <label>Website:</label>
                        <p>{savedData.website}</p>
                    </div>
                    <div className="profile-field-social">
                        <label>Sosyal Medya Hesaplarım:</label>
                        <p>{savedData.social1}</p>
                        <p>{savedData.social2}</p>
                        <p>{savedData.social3}</p>
                        <p>{savedData.social4}</p>
                    </div>
                    <button className="my-profile-edit" type="button" onClick={handleEdit}>
                        Değiştir
                    </button>
                </div>
            )}
        </div>
    );
}

export default MyProfile;
