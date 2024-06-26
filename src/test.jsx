import React, { useState } from 'react';
import editPencil from '../../../assets/icons/edit-pencil.png';
import "./UserProfile.scss";
import { useAuth } from "../../AuthProvider";

const UserProfile = () => {
    const { user, updateUser, updatePassword } = useAuth();
    const [editMode, setEditMode] = useState({
        username: false,
        email: false,
        password: false,
        MobilePhone: false
    });
    const [userData, setUserData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: '',
        MobilePhone: user?.MobilePhone || ''
    });

    const handleEditClick = (field) => {
        setEditMode({ ...editMode, [field]: true });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleCancelClick = (field) => {
        setEditMode({ ...editMode, [field]: false });
        setUserData({ ...userData, [field]: user[field] || '' });
    };

    const handleSaveClick = async (field) => {
        setEditMode({ ...editMode, [field]: false });
        try {
            if (field === 'password') {
                await updatePassword(userData.password);
            } else {
                await updateUser(userData);
            }
        } catch (error) {
            console.error("Güncelleme işlemi başarısız", error);
        }
    };

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
                {editMode.username ? (
                    <div>
                        <input
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                        />
                        <button onClick={() => handleSaveClick('username')}>Onayla</button>
                        <button onClick={() => handleCancelClick('username')}>İptal</button>
                    </div>
                ) : (
                    <>
                        <p className="subsetting-paragraph">{user?.username || 'Kullanıcı Adı'}</p>
                        <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('username')} />
                    </>
                )}
            </div>

            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">E-posta Adresi</h3>
                {editMode.email ? (
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                        <button onClick={() => handleSaveClick('email')}>Onayla</button>
                        <button onClick={() => handleCancelClick('email')}>İptal</button>
                    </div>
                ) : (
                    <>
                        <p className="subsetting-paragraph">{user?.email || 'E-posta Adresi bilgisi yok'}</p>
                        <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('email')} />
                    </>
                )}
            </div>

            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Şifre</h3>
                {editMode.password ? (
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                        <button onClick={() => handleSaveClick('password')}>Onayla</button>
                        <button onClick={() => handleCancelClick('password')}>İptal</button>
                    </div>
                ) : (
                    <>
                        <p className="subsetting-paragraph">*********</p>
                        <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('password')} />
                    </>
                )}
            </div>

            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Telefon</h3>
                {editMode.MobilePhone ? (
                    <div>
                        <input
                            type="text"
                            name="MobilePhone"
                            value={userData.MobilePhone}
                            onChange={handleInputChange}
                        />
                        <button onClick={() => handleSaveClick('MobilePhone')}>Onayla</button>
                        <button onClick={() => handleCancelClick('MobilePhone')}>İptal</button>
                    </div>
                ) : (
                    <>
                        <p className="subsetting-paragraph">{user?.MobilePhone || 'Telefon bilgisi yok'}</p>
                        <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('MobilePhone')} />
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
