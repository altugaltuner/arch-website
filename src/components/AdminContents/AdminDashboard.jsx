import React from 'react';
import "./AdminDashboard.scss";

function AdminDashBoard() {

    return (
        <div className="admin-dashboard-main">
            <div className='dashboard-current-state-all'>
                <h2 className='dashboard-header'>Genel Durum</h2>
                <div>
                    <h3 className='dashboard-p'>Kullanıcı Sayısı</h3>
                    <p>20</p>
                </div>
                <div>
                    <h3 className='dashboard-p'>Proje Sayısı</h3>
                    <p>25</p> {/* This should be dynamic and projects name should include*/}
                    <p className='dashboard-p'>Aktif Projeler</p>
                    <p className='dashboard-p'>Tamamlanan Projeler</p>
                </div>
                <div>
                    <h3 className='dashboard-p'>Tüm Revizeler</h3>
                    <p>revize 1</p>
                    <p>revize 2</p>
                </div>
                <div>
                    <h3 className='dashboard-p'>Kullanılan Alan</h3>
                    <p>20GB</p>
                </div>
            </div>

            <div className='dashboard-last-activities'>
                <h2 className='dashboard-act-header'>Son Aktiviteler</h2>
                <p className='dashboard-act-p'>Altuğ Altuner - X Projesinden Y Klasöründen "Zemin Planları" dosyasını indirdi.</p>
                <p className='dashboard-act-p'>Elif Yılmaz - Finans Projesinden Raporlar Klasöründen "2023 Bilanço" dosyasını indirdi.</p>
                <p className='dashboard-act-p'>Mehmet Arslan - Pazarlama Projesinden Sunumlar Klasöründen "Q1 Strateji" dosyasını sildi.</p>
                <p className='dashboard-act-p'>Ayşe Demir - İnsan Kaynakları Projesinden Dökümanlar Klasöründen "Eğitim Programı" dosyasına yorum yazdı.</p>
                <p className='dashboard-act-p'>Fatih Koç - Satış Projesinden Teklifler Klasöründen "Müşteri Teklifleri" dosyasını indirdi.</p>
                <p className='dashboard-act-p'>Zeynep Kaya - AR-GE Projesinden Araştırmalar Klasöründen "Pazar Analizi" dosyasını sildi.</p>
            </div>
        </div>
    );
}

export default AdminDashBoard;