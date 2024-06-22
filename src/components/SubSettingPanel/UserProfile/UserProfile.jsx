import React from 'react';
import editPencil from '../../../assets/icons/edit-pencil.png';
import "./UserProfile.scss";

const UserProfile = () => (
    <div className="personal-info-subsetting-column">
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Profil Fotoğrafı
                <img className="subsetting-pp" src="https://via.placeholder.com/150" alt="profile" />
            </h3>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Kullanıcı Adı</h3>
            <p className="subsetting-paragraph">Altuğ Altuner</p>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">E-posta Adresi</h3>
            <p className="subsetting-paragraph">altugaltuner@gmail.com</p>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Şifre</h3>
            <p className="subsetting-paragraph">*********</p>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Telefon</h3>
            <p className="subsetting-paragraph">0535 486 55 55</p>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
    </div>
);

export default UserProfile;
