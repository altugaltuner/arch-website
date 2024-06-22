import "./SubNavigationSettings.scss";

function SubNavigationSettings({ getRelevantSettings }) {
    const sections = [
        {
            header: "Kullanıcı Bilgileri ve Profili",
            items: ["Kullanıcı adı", "E-posta adresi", "Şifre değiştirme", "Telefon Değiştirme", "Profil fotoğrafı yükleme"]
        },
        {
            header: "Bildirim Ayarları",
            items: ["E-posta bildirimleri açma/kapatma", "Uygulama içi bildirimler", "SMS bildirimleri"]
        },
        {
            header: "Gizlilik ve Güvenlik",
            items: ["Hesap güvenliği ayarları (2FA gibi)", "Hesap dondurma veya silme seçenekleri"]
        },
        {
            header: "Uygulama Ayarları",
            items: ["Tema seçimi (açık/koyu mod)", "Uygulama güncellemeleri"]
        },
        {
            header: "Veri ve Depolama",
            items: ["Veri yedekleme ve geri yükleme seçenekleri", "Depolama kullanımı ve yönetimi", "Arşivleme seçenekleri"]
        }
    ];

    return (
        <div className="sub-navi-settings-page">
            <h1 className="sub-nav-header">Ayarlar</h1>
            <div className="sub-nav-container">
                <div className="sub-nav-content">
                    {sections.map((section, index) => (
                        <div key={index} className="sub-nav-section">
                            <h2 onClick={getRelevantSettings} className="sub-nav-subheader">{section.header}</h2>
                            {section.items.map((item, idx) => (
                                <p key={idx}>{item}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubNavigationSettings;
