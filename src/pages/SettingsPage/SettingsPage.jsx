import { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import SubNavigationSettings from "../../components/SubNavigationSettings/SubNavigationSettings";
import SubSettingPanel from "../../components/SubSettingPanel/SubSettingPanel";
import "./SettingsPage.scss";

function SettingsPage() {
    const [selectedSetting, setSelectedSetting] = useState("Kullanıcı Bilgileri ve Profili");

    const getRelevantSettings = (setting) => {
        setSelectedSetting(setting);
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
