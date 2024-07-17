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
        profession: { professionName: "" }
    });

    useEffect(() => {
        if (user) {
            const initialData = {
                profilePic: user.profilePic || "",
                name: user.username || "",
                location: user.UserLocation || "",
                mobilePhone: user.MobilePhone || "",
                email: user.email || "",
                social1: user.socialMedia || "",
                profession: user.profession || { professionName: "" }
            };
            setFormData(initialData);
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    if (!user) {
        return <div>Yükleniyor...</div>;
    }

    return (
        <div className="profile">
            <div className="profile-info">
                <div className="profile-image">
                    <img
                        className="profile-pic"
                        src={formData.profilePic ? `https://bold-animal-facf707bd9.strapiapp.com${formData.profilePic.url}` : undefinedProfilePic}
                        alt="Profile"
                    />
                </div>
                <div className="profile-field">
                    <label className="profile-field-labels" htmlFor="name">İsim Soyisim:</label>
                    <p className="profile-field-paragraph" id="name">{formData.name}</p>
                </div>
                <div className="profile-field">
                    <label className="profile-field-labels" htmlFor="profession">Meslek:</label>
                    <p className="profile-field-paragraph" id="profession">{formData.profession.professionName}</p>
                </div>
                <div className="profile-field">
                    <label className="profile-field-labels" htmlFor="email">E-posta:</label>
                    <p className="profile-field-paragraph" id="email">{formData.email}</p>
                </div>
                <div className="profile-field">
                    <label className="profile-field-labels" htmlFor="mobilePhone">Telefon:</label>
                    <p className="profile-field-paragraph" id="mobilePhone">{formData.mobilePhone}</p>
                </div>
                <div className="profile-field">
                    <label className="profile-field-labels" htmlFor="location">Konum:</label>
                    <p className="profile-field-paragraph" id="location">{formData.location}</p>
                </div>
                <div className="profile-field-social">
                    <label className="profile-field-labels" htmlFor="socialMedia">Sosyal Medya:</label>
                    <p className="profile-field-paragraph" id="socialMedia">{formData.social1}</p>
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
