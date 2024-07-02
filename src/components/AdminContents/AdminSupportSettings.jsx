import React from 'react';
import "./AdminSupportSettings.scss";

function AdminSupportSettings() {

    return (
        <div className="admin-support-settings-main">
            <div className='support-div'>
                <h2 className='support-div-header'>Geri Bildirim</h2>
                <p className='support-div-p'>Geri Bildirimleriniz İçin : vefgend@gmail.com adresine email atabilirsiniz.</p>
            </div>
            <div>
                <h2 className='support-div-header'>Sıkça Sorulan Sorular</h2>
                <p className='support-div-question'>Nedir?</p>
                <p className='support-div-answer'>Açıklama</p>
                <p className='support-div-question'>Nedir?</p>
                <p className='support-div-answer'>Açıklama</p>
                <p className='support-div-question'>Nedir?</p>
                <p className='support-div-answer'>Açıklama</p>
            </div>
            <div>
                <h2 className='support-div-header'>Destek Talepleri</h2>
                <p className='support-div-p'>Geri Bildirimleriniz İçin : vefgend@gmail.com adresine email atabilirsiniz.</p>
            </div>
        </div>
    );
}

export default AdminSupportSettings;