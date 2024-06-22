import editPencil from '../../../assets/icons/edit-pencil.png';
import React from 'react';

const PrivacySecurity = () => (
    <div className="personal-info-subsetting-column">
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Hesap güvenliği ayarları (2FA gibi)</h3>
            <p className="subsetting-paragraph">Yes/No</p>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Hesap dondurma veya silme seçenekleri</h3>
            <p className="subsetting-paragraph">Hesabı Dondur</p>
            <p className="subsetting-paragraph">Hesabı Sil</p>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
    </div>
);

export default PrivacySecurity;
