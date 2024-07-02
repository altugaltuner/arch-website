import React from 'react';
import "./AdminDashboard.scss";

function AdminDashBoard() {
    const activities = [
        { user: "Altuğ Altuner", project: "X Projesi", folder: "Y Klasörü", file: "Zemin Planları", action: "indirdi" },
        { user: "Elif Yılmaz", project: "Finans Projesi", folder: "Raporlar Klasörü", file: "2023 Bilanço", action: "indirdi" },
        { user: "Mehmet Arslan", project: "Pazarlama Projesi", folder: "Sunumlar Klasörü", file: "Q1 Strateji", action: "sildi" },
        { user: "Ayşe Demir", project: "İnsan Kaynakları Projesi", folder: "Dökümanlar Klasörü", file: "Eğitim Programı", action: "yorum yazdı" },
        { user: "Fatih Koç", project: "Satış Projesi", folder: "Teklifler Klasörü", file: "Müşteri Teklifleri", action: "indirdi" },
        { user: "Zeynep Kaya", project: "AR-GE Projesi", folder: "Araştırmalar Klasörü", file: "Pazar Analizi", action: "sildi" }
    ];

    return (
        <div className="admin-dashboard-main">
            <div className='dashboard-current-state-all'>
                <h2 className='dashboard-header'>Genel Durum</h2>
                <div className='dashboard-row-inner'>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Kullanıcı Sayısı</h3>
                        <p className='dashboard-p'>20</p>
                    </div>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Proje Sayısı</h3>
                        <p className='dashboard-p'>25</p>
                    </div>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Tüm Revizeler</h3>
                        <p className='dashboard-p'>revize 1</p>
                        <p className='dashboard-p'>revize 2</p>
                    </div>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Kullanılan Alan</h3>
                        <p className='dashboard-p'>20GB</p>
                    </div>
                </div>
            </div>

            <div className='dashboard-last-activities'>
                <h2 className='dashboard-act-header'>Tüm Aktiviteler</h2>
                {activities.map((activity, index) => (
                    <p key={index} className='dashboard-act-p'>
                        {activity.user} - {activity.project}nden {activity.folder}nden "{activity.file}" dosyasını {activity.action}.
                    </p>
                ))}
            </div>
        </div>
    );
}

export default AdminDashBoard;
