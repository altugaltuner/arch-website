import React from 'react';
import "./AdminDashboard.scss";

function AdminDashBoard() {

    return (
        <div className="admin-dashboard-main">
            <div className='dashboard-current-state-all'>
                <h2>Genel Durum</h2>
                <p>Kullanıcı Sayısı</p>
                <p>Aktif Projeler</p>
                <p>Tamamlanan Projeler</p>
                <p>Gönderilen Mesaj Sayısı</p>
                <p>Kullanılan Alan</p>
            </div>
            <div className='dashboard-last-activities'>
                <h2>Son Aktiviteler</h2>
                <p>Altuğ Altuner - X Projesinden Y Klasöründen "Zemin Planları" dosyasını indirdi.</p>
                <p>Elif Yılmaz - Finans Projesinden Raporlar Klasöründen "2023 Bilanço" dosyasını indirdi.</p>
                <p>Mehmet Arslan - Pazarlama Projesinden Sunumlar Klasöründen "Q1 Strateji" dosyasını sildi.</p>
                <p>Ayşe Demir - İnsan Kaynakları Projesinden Dökümanlar Klasöründen "Eğitim Programı" dosyasına yorum yazdı.</p>
                <p>Fatih Koç - Satış Projesinden Teklifler Klasöründen "Müşteri Teklifleri" dosyasını indirdi.</p>
                <p>Zeynep Kaya - AR-GE Projesinden Araştırmalar Klasöründen "Pazar Analizi" dosyasını sildi.</p>
            </div>
        </div>
    );
}

export default AdminDashBoard;