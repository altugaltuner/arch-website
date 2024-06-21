import "./SubSettingPanel.scss";

function SubSettingPanel({ selectedSetting }) {
    const renderContent = () => {
        switch (selectedSetting) {
            case "Kullanıcı Bilgileri ve Profili":
                return (

                    <div className="personal-info-subsetting-column">
                        <h3 className="subsetting-header">Profil Fotoğrafı <img className="subsetting-pp" src="https://via.placeholder.com/150" alt="profile" /></h3>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Kullanıcı Adı</h3>
                            <p className="subsetting-paragraph">Altuğ Altuner</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">E-posta Adresi</h3>
                            <p className="subsetting-paragraph">altugaltuner@gmail.com</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Şifre</h3>
                            <p className="subsetting-paragraph">*********</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Telefon</h3>
                            <p className="subsetting-paragraph">0535 486 55 55</p>
                        </div>
                    </div>
                );
            case "Bildirim Ayarları":
                return (
                    <div className="personal-info-subsetting-column">
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">E-posta bildirimleri açma/kapatma</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Uygulama içi bildirimler:</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">SMS bildirimleri:</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                    </div>
                );
            case "Gizlilik ve Güvenlik":
                return (
                    <div className="personal-info-subsetting-column">
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Hesap güvenliği ayarları (2FA gibi)</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Veri paylaşım tercihleri</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Hesap dondurma veya silme seçenekleri</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                    </div>
                );
            case "Uygulama Ayarları":
                return (
                    <div className="personal-info-subsetting-column">
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Tema seçimi</h3>
                            <p className="subsetting-paragraph">açık/koyu mod</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Dil ve bölge ayarları</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Uygulama güncellemeleri</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                    </div>
                );
            case "Veri ve Depolama":
                return (
                    <div className="personal-info-subsetting-column">
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Veri yedekleme ve geri yükleme seçenekleri</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Depolama kullanımı ve yönetimi</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                        <div className="personal-info-subsetting-oneline">
                            <h3 className="subsetting-header">Arşivleme seçenekleri</h3>
                            <p className="subsetting-paragraph">Yes/No</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="sub-setting-panel-page">
            <h2 className="sub-setting-panel-header">{selectedSetting}</h2>
            {renderContent()}
        </div>
    );
}

export default SubSettingPanel;
