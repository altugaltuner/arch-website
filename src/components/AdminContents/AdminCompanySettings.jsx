import { useState, useEffect } from "react";
import "./AdminCompanySettings.scss";

const AdminCompanySettings = () => {

    return (
        <div className="admin-company-settings-main">
            <div className="admin-company-inner">
                <h2 className="admin-company-header">Şirket Profili</h2>
                <p className="admin-company-p">Altın Mimarlık</p>
            </div>


            <div className="admin-company-inner">
                <h2 className="admin-company-header">Şirket Aboneliğini Yönet</h2>
                <p className="admin-company-p">Aktif Abonelik : 100GB </p>
            </div>
        </div>
    );
};

export default AdminCompanySettings;
