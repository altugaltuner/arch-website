import React, { useState } from 'react';
import "./NotificationSettings";

const NotificationSettings = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    return (
        <div className="personal-info-subsetting-column">
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">E-posta bildirimleri açma/kapatma</h3>
                <p className="subsetting-paragraph">Yes/No</p>
            </div>
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Uygulama içi bildirimler:</h3>
                <div className="toggle-switch" onClick={handleToggle}>
                    <div className={`toggle-switch-inner ${isToggled ? 'on' : 'off'}`}>
                        <span>{isToggled ? 'YES' : 'NO'}</span>
                    </div>
                </div>
            </div>
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">SMS bildirimleri:</h3>
                <p className="subsetting-paragraph">Yes/No</p>
            </div>
        </div>
    );
};

export default NotificationSettings;
