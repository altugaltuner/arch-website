import React, { useState } from "react";
import "./AdminPanelPage.scss";
import { useAuth } from "../../components/AuthProvider";
import AdminPanelSubNav from "../../components/AdminPanelSubNav/AdminPanelSubNav";
import Navigation from "../../components/Navigation/Navigation";
import AdminContent from "../../components/AdminContent/AdminContent";

function AdminPanelPage() {
    const auth = useAuth();
    const [selectedSetting, setSelectedSetting] = useState("Dashboard");

    const getRelevantSettings = (setting) => {
        setSelectedSetting(setting);
    };

    return (
        <main className="admin-panel-main">
            <Navigation />
            <div className="admin-content">
                <AdminPanelSubNav getRelevantSettings={getRelevantSettings} />
                <AdminContent selectedSetting={selectedSetting} />
            </div>
        </main>
    );
};

export default AdminPanelPage;
