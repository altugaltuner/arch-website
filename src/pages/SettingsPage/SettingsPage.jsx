import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";
import SubNavigationSettings from "../../components/SubNavigationSettings/SubNavigationSettings";
import "./SettingsPage.scss";


function SettingsPage() {

    return (
        <main className="settings-page">
            <Navigation />
            <div className="settings-page-column">
                <SubNavigationSettings />
            </div>
        </main>
    );
}

export default SettingsPage;
