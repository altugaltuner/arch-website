import React from 'react';
import "./SubSettingPanel.scss";
import AppSettings from "./AppSettings/AppSettings";
import DataStorage from './DataStorage/DataStorage';
import PrivacySecurity from "./PrivacySecurity/PrivacySecurity";
import NotificationSettings from './NotificationSettings/NotificationSettings';
import UserProfile from './UserProfile/UserProfile';
import AboutUs from './AboutUs/AboutUs';

function SubSettingPanel({ selectedSetting }) {
    const renderContent = () => {
        switch (selectedSetting) {
            case "Kullanıcı Bilgileri ve Profili":
                return <UserProfile />;
            case "Bildirim Ayarları":
                return <NotificationSettings />;
            case "Gizlilik ve Güvenlik":
                return <PrivacySecurity />;
            case "Uygulama Ayarları":
                return <AppSettings />;
            case "Veri ve Depolama":
                return <DataStorage />;
            case "Hakkımızda":
                return <AboutUs />;
            default:
                return null;
        }
    };

    return (
        <div className="sub-setting-panel-page">
            <h2 className="sub-setting-panel-header">{selectedSetting}</h2>
            {renderContent()}
        </div>
    );
}

export default SubSettingPanel;