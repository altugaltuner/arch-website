import React from 'react';
import "./AdminContent.scss";

import AdminCompanySettings from "../../components/AdminContents/AdminCompanySettings";
import AdminDashboard from "../../components/AdminContents/AdminDashboard";
import AdminUsersSettings from "../../components/AdminContents/AdminUsersSettings";
import AdminSupportSettings from '../../components/AdminContents/AdminSupportSettings';
import AdminSendMessage from '../../components/AdminContents/AdminSendMessage';

function AdminContent({ selectedSetting }) {
    const renderContent = () => {
        switch (selectedSetting) {
            case "Dashboard":
                return <AdminDashboard />;
            case "İleti Gönderme":
                return <AdminSendMessage />;
            case "Kullanıcı Ayarları":
                return <AdminUsersSettings />;
            case "Şirket Ayarları":
                return <AdminCompanySettings />;
            case "Destek ve Geri Bildirim":
                return <AdminSupportSettings />;
            default:
                return null;
        }
    };

    return (
        <div className="admin-sub-setting-page">
            <h2 className="admin-sub-header">{selectedSetting}</h2>
            <div className='admin-sub-panel-content'>
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminContent;