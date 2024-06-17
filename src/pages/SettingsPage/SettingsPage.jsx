import { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";
import "./SettingsPage.scss";


function SettingsPage() {

    return (
        <main className="settings-page">
            <Navigation />
            <div className="settings-page-column">

            </div>
        </main>
    );
}

export default SettingsPage;
