import React from 'react';
import editPencil from '../../../assets/icons/edit-pencil.png';
import "./UserProfile.scss";
import { useAuth } from "../../AuthProvider"

const UserProfile = () => {
    const { user } = useAuth(); //kullanıcı bilgilerine ulaştım

    return (
        <div className="personal-info-subsetting-column">
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Profil Fotoğrafı
                    <img className="subsetting-pp" src={`http://localhost:1337${user.profilePic?.url || ""}`} alt="profile-pic" />
                </h3>
                <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
            </div>
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Kullanıcı Adı</h3>
                <p className="subsetting-paragraph">{user?.username || 'Kullanıcı Adı'}</p>
                <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
            </div>
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">E-posta Adresi</h3>
                <p className="subsetting-paragraph">{user?.email || 'E-posta Adresi bilgisi yok'}</p>
                <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
            </div>
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Şifre</h3>
                <p className="subsetting-paragraph">*********</p>
                <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
            </div>
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Telefon</h3>
                <p className="subsetting-paragraph">{user?.MobilePhone || 'Telefon bilgisi yok'}</p>
                <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
            </div>
        </div>
    );
};

export default UserProfile;
