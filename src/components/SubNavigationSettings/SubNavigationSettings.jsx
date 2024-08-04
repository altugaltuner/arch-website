import React, { useState } from 'react';
import './SubNavigationSettings.scss';

function SubNavigationSettings({ getRelevantSettings }) {
    const [selectedSection, setSelectedSection] = useState(1);

    const sections = [
        {
            id: 1,
            header: "Kullanıcı Bilgileri ve Profili",
            items: ["Kullanıcı adı", "E-posta adresi", "Şifre değiştirme", "Telefon Değiştirme", "Profil fotoğrafı yükleme"]
        },
        {
            id: 2,
            header: "Bildirim Ayarları",
            items: ["E-posta bildirimleri açma/kapatma", "Uygulama içi bildirimler", "SMS bildirimleri"]
        },
        {
            id: 3,
            header: "Uygulama Ayarları",
            items: ["Tema seçimi (açık/koyu mod)", "Uygulama güncellemeleri"]
        },
        {
            id: 4,
            header: "Veri ve Depolama",
            items: ["Veri yedekleme ve geri yükleme seçenekleri", "Depolama kullanımı ve yönetimi", "Arşivleme seçenekleri"]
        },
        {
            id: 5,
            header: "Gizlilik ve Güvenlik",
            items: ["Hesap güvenliği ayarları (2FA gibi)", "Hesap dondurma veya silme seçenekleri"]
        },
        {
            id: 6,
            header: "Hakkımızda",
            items: ["Ofisim Proje Yönetim Sistemi", "Biz Kimiz ?", "Bize Ulaşın"]
        }
    ];

    const handleSectionClick = (section) => {
        setSelectedSection(section.id);
        if (section.id === 1 || section.id === 6) {
            getRelevantSettings(section.header);
        }
    };

    return (
        <div className="sub-navi-settings-page">
            <h1 className="div-big-header">Ayarlar</h1>
            <div className="sub-nav-container">
                <div className="sub-nav-content">
                    {sections.map((section, index) => (
                        <div
                            key={index}
                            className={`sub-nav-section ${section.id === selectedSection ? 'selected' : ''} ${(section.id !== 1 && section.id !== 6) ? 'disabled' : ''}`}
                            onClick={() => handleSectionClick(section)}
                        >
                            <h2 className="sub-nav-subheader">{section.header}</h2>
                            {section.items.map((item, idx) => (
                                <p className="sub-nav-p" key={idx}>{item}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubNavigationSettings;
