import React, { useState } from "react";
import "./MyProfile.scss";
import { useAuth } from "../../components/AuthProvider";

import profilePic from "../../assets/pp.jpg";

function MyProfile() {

    const auth = useAuth();

    return (
        <div className="profile">
            <div className="profile-image">
                <img className="profile-pic" src={profilePic} alt="Profile" />
            </div>
            <form className="profile-form">
                <div className="profile-field">
                    <label htmlFor="name">İsim Soyisim</label>
                    <input className="input-for-labels" type="text" id="name" name="name" placeholder="İsminiz" />
                </div>
                <div className="profile-field">
                    <label htmlFor="bio">Biyografi</label>
                    <textarea className="biography-area" id="bio" name="bio" placeholder="biyografiniz"></textarea>
                </div>

                <div className="profile-field">
                    <label htmlFor="location">Konum</label>
                    <input className="input-for-labels" type="text" id="location" name="location" />
                </div>

                <div className="profile-field">
                    <label htmlFor="website">Website</label>
                    <input className="input-for-labels" type="text" id="website" name="website" />
                </div>
                <div className="profile-field-social">
                    <label>Sosyal Medya Hesaplarım</label>
                    <input className="input-for-labels" type="text" name="social1" placeholder="Link to social profile" />
                    <input className="input-for-labels" type="text" name="social2" placeholder="Link to social profile" />
                    <input className="input-for-labels" type="text" name="social3" placeholder="Link to social profile" />
                    <input className="input-for-labels" type="text" name="social4" placeholder="Link to social profile" />
                </div>
                <div className="profile-buttons">
                    <button className="my-profile-submit" type="submit">Kaydet</button>
                    <button className="my-profile-cancel" type="button">İptal Et</button>
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
