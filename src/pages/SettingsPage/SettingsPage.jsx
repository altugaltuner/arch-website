import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";
import SubNavigationSettings from "../../components/SubNavigationSettings/SubNavigationSettings";
import SubSettingPanel from "../../components/SubSettingPanel/SubSettingPanel";
import "./SettingsPage.scss";


function SettingsPage() {

    return (
        <main className="settings-page">
            <Navigation />
            <div className="settings-page-row">
                <SubNavigationSettings />
                <SubSettingPanel />
            </div>
        </main>
    );
}

export default SettingsPage;
