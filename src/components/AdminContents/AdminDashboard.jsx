import React from 'react';
import "./AdminDashboard.scss";

function AdminDashBoard({ projectCount, userCount, reviseCount }) {

    return (
        <div className="admin-dashboard-main">
            <div className='dashboard-current-state-all'>
                <h2 className='dashboard-header'>Genel Durum</h2>
                <div className='dashboard-row-inner'>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Sisteme Kayıtlı Çalışan Sayısı</h3>
                        <p className='dashboard-p'> {userCount}</p>
                    </div>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Proje Sayısı</h3>
                        <p className='dashboard-p'>{projectCount}</p>
                    </div>
                    <div className='dashboard-oneline-inner'>
                        <h3 className='dashboard-p-header'>Tüm Revize Miktarı</h3>
                        <p className='dashboard-p'>{reviseCount}</p>

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
