import React from 'react';
import './AdminPanelSubNav.scss';

function AdminPanelSubNav({ getRelevantSettings }) {
    const adminSections = [
        {
            id: 1,
            header: "Dashboard",
            items: ["Genel Durum", "Son Aktiviteler"]
        },
        {
            id: 2,
            header: "İleti Gönderme",
            items: ["Toplu İleti", "Özel İleti"]
        },
        {
            id: 3,
            header: "Kullanıcı Ayarları",
            items: ["Kullanıcı Ekleme/Silme", "Kullanıcı Rol ve İzinleri Yönetme", "Şirket içi ve dışı kullanıcılar"]
        },
        {
            id: 4,
            header: "Şirket Ayarları",
            items: ["Şirket Profili", "Şirket Aboneliği", "Güvenlik Ayarları"]
        },
        {
            id: 5,
            header: "Destek ve Geri Bildirim",
            items: ["Geri Bildirim", "Sıkça Sorulan Sorular", "Destek Talepleri"]
        },
    ];

    return (
        <div className="adminpanel-settings-page">
            <h1 className="adminpanel-header">Ayarlar</h1>
            <div className="adminpanel-container">
                <div className="adminpanel-content">
                    {adminSections.map((section, index) => (
                        <div
                            key={index}
                            className={`adminpanel-section ${(section.id === 7) ? 'disabled' : ''}`}
                            onClick={() => (section.id !== 7) && getRelevantSettings(section.header)}
                        >
                            <h2 className="adminpanel-subheader">{section.header}</h2>
                            {section.items.map((item, idx) => (
                                <p className="adminpanel-paragraph" key={idx}>{item}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminPanelSubNav;
