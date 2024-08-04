import React from 'react';
import "./AdminDashboard.scss";

function AdminDashBoard({ projectCount, userCount, reviseCount, finishedProjectCount, onGoingProjectCount, onGoingReviseCount, CanceledReviseCount, finishedReviseCount }) {

    return (
        <div className="admin-dashboard-main">
            <div className='dashboard-current-state-all'>
                <h2 className='paragraph-header'>Genel Durum</h2>
                <div className='dashboard-row-inner'>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Sisteme Kayıtlı Çalışan Sayısı</h3>
                        <p className='dashboard-p'> {userCount}</p>
                    </div>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Proje Sayısı</h3>
                        <p className='dashboard-p'>{projectCount}</p>
                        <h3 className='dashboard-p-header'>Devam Eden Projeler</h3>
                        <p className='dashboard-p'>{onGoingProjectCount}</p>
                        <h3 className='dashboard-p-header'>Biten Projeler</h3>
                        <p className='dashboard-p'>{finishedProjectCount}</p>
                    </div>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Tüm Revize Miktarı</h3>
                        <p className='dashboard-p'>{reviseCount}</p>
                        <h3 className='dashboard-p-header'>Tamamlanan</h3>
                        <p className='dashboard-p'>{finishedReviseCount}</p>
                        <h3 className='dashboard-p-header'>Devam Eden </h3>
                        <p className='dashboard-p'>{onGoingReviseCount}</p>
                        <h3 className='dashboard-p-header'>İptal Edilen</h3>
                        <p className='dashboard-p'>{CanceledReviseCount}</p>

                    </div>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Kullanılan Alan</h3>
                        <p className='dashboard-p'>20GB</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashBoard;
