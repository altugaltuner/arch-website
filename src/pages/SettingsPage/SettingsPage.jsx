import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";
import SubNavigationSettings from "../../components/SubNavigationSettings/SubNavigationSettings";
import SubSettingPanel from "../../components/SubSettingPanel/SubSettingPanel";
import "./SettingsPage.scss";
import { get } from "firebase/database";


function SettingsPage() {

    const [selectedSetting, setSelectedSetting] = useState("Kullanıcı Bilgileri ve Profili");

    const getRelevantSettings = (e) => {
        setSelectedSetting(e.target.textContent);
    };

    return (
        <main className="settings-page">
            <Navigation />
            <div className="settings-page-row">
                <SubNavigationSettings getRelevantSettings={getRelevantSettings} />
                <SubSettingPanel selectedSetting={selectedSetting} />
            </div>
        </main>
    );
}

export default SettingsPage;
