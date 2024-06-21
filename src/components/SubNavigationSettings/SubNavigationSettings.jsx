import { useState, useEffect } from "react";
import "./SubNavigationSettings.scss";

function SubNavigationSettings() {
    return (
        <div className="sub-navi-settings-page">
            <h1 className="sub-nav-header">Ayarlar</h1>
            <div className="sub-nav-container">
                <div className="sub-nav-content">
                    <div className="sub-nav-section">
                        <h2 className="sub-nav-subheader">Kullanıcı Bilgileri ve Profili</h2>
                        <p>Kullanıcı adı</p>
                        <p>E-posta adresi</p>
                        <p>Şifre değiştirme</p>
                        <p>Profil fotoğrafı yükleme</p>
                    </div>
                    <div className="sub-nav-section">
                        <h2 className="sub-nav-subheader">Bildirim Ayarları</h2>
                        <p>E-posta bildirimleri açma/kapatma</p>
                        <p>Uygulama içi bildirimler</p>
                        <p>SMS bildirimleri</p>
                    </div>
                    <div className="sub-nav-section">
                        <h2 className="sub-nav-subheader">Gizlilik ve Güvenlik</h2>
                        <p>Hesap güvenliği ayarları (2FA gibi)</p>
                        <p>Veri paylaşım tercihleri</p>
                        <p>Hesap dondurma veya silme seçenekleri</p>
                    </div>
                    <div className="sub-nav-section">
                        <h2 className="sub-nav-subheader">Uygulama Ayarları</h2>
                        <p>Tema seçimi (açık/koyu mod)</p>
                        <p>Dil ve bölge ayarları</p>
                        <p>Uygulama güncellemeleri</p>
                    </div>
                    <div className="sub-nav-section">
                        <h2 className="sub-nav-subheader">Veri ve Depolama</h2>
                        <p>Veri yedekleme ve geri yükleme seçenekleri</p>
                        <p>Depolama kullanımı ve yönetimi</p>
                        <p>Arşivleme seçenekleri</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubNavigationSettings;
