import React, { useState } from 'react';
import './AdminPanelSubNav.scss';

function AdminPanelSubNav({ getRelevantSettings }) {
    const [selectedSection, setSelectedSection] = useState(1);

    const adminSections = [
        {
            id: 1,
            header: "Dashboard",
            items: ["Genel Durum", "Son Aktiviteler"]
        },
        {
            id: 2,
            header: "İleti Gönderme",
            items: ["Gönderilenler", "Toplu İleti Gönder", "Çöp Kutusu"]
        },
        {
            id: 3,
            header: "Proje, Grup ve Kullanıcı Ayarları",
            items: ["Proje Ayarları", "Grup Ayarları", "Kullanıcı Ayarları"]
        },
        {
            id: 4,
            header: "Şirket Ayarları",
            items: ["Şirket Profili", "Şirket Aboneliği"]
        },
        {
            id: 5,
            header: "Destek ve Geri Bildirim",
            items: ["Geri Bildirim", "Sıkça Sorulan Sorular", "Destek Talepleri"]
        },
    ];

    const handleSectionClick = (section) => {
        setSelectedSection(section.id);
        if (section.id !== 7) {
            getRelevantSettings(section.header);
        }
    };

    return (
        <div className="adminpanel-settings-page">
            <h1 className="div-big-header">Ayarlar</h1>
            <div className="adminpanel-container">
                <div className="adminpanel-content">
                    {adminSections.map((section, index) => (
                        <div
                            key={index}
                            className={`adminpanel-section ${section.id === selectedSection ? 'selected' : ''} ${section.id === 7 ? 'disabled' : ''}`}
                            onClick={() => handleSectionClick(section)}
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
