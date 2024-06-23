import React, { useEffect, useState } from "react";
import "./MyProfile.scss";
import undefinedProfilePic from "../../assets/icons/undefinedProfilePic.png";

function MyProfile({ user }) {
    const [formData, setFormData] = useState({
        profilePic: "",
        name: "",
        location: "",
        mobilePhone: "",
        email: "",
        social1: "",
    });

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
        }
    }, [user]);

    const handleLogout = () => {
        window.location.href = "/login";
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <div className="profile-info">
                <div className="profile-image">
                    <img
                        className="profile-pic"
                        src={formData.profilePic ? `http://localhost:1337${formData.profilePic.url}` : undefinedProfilePic}
                        alt="Profile"
                    />
                </div>
                <div className="profile-field">
                    <label className="profile-field-labels">İsim Soyisim:</label>
                    <p className="profile-field-paragraph">{formData.name}</p>
                </div>
                <div className="profile-field">
                    <label className="profile-field-labels">E-posta:</label>
                    <p className="profile-field-paragraph">{formData.email}</p>
                </div>
                <div className="profile-field">
                    <label className="profile-field-labels">Telefon:</label>
                    <p className="profile-field-paragraph">{formData.mobilePhone}</p>
                </div>
                <div className="profile-field">
                    <label className="profile-field-labels">Konum:</label>
                    <p className="profile-field-paragraph">{formData.location}</p>
                </div>
                <div className="profile-field-social">
                    <label className="profile-field-labels">Sosyal Medya:</label>
                    <p className="profile-field-paragraph">{formData.social1}</p>
                </div>
                <div className="buttons-for-profile-section">
                    <button className="my-profile-logout" type="button" onClick={handleLogout}>
                        Çıkış Yap
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
