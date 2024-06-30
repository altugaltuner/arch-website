import React, { useState } from "react";
import "./AdminPanelPage.scss";
import { useAuth } from "../../components/AuthProvider";

import Navigation from "../../components/Navigation/Navigation";

function AdminPanelPage() {
    const auth = useAuth();

    return (
        <main className="admin-panel-main">
            <Navigation />
            <div className="admin-panel-inner">
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum sed, repellendus iste aperiam eum reprehenderit vero reiciendis porro saepe alias dicta suscipit ratione? Inventore unde repudiandae veritatis dolorum rem repellat!</p>
            </div>
        </main>
    );
};

export default AdminPanelPage;
