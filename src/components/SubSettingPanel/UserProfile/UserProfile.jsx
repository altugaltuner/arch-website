import React, { useState } from 'react';
import editPencil from '../../../assets/icons/edit-pencil.png';
import "./UserProfile.scss";
import { useAuth } from "../../AuthProvider";

const UserProfile = () => {

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    const { user, updateProfilePhoto } = useAuth();
    const [editMode, setEditMode] = useState({
        username: false,
        email: false,
        password: false,
        MobilePhone: false,
        profilePic: false,
        userLocation: false
    });
    const [userData, setUserData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        password: '',
        MobilePhone: user?.MobilePhone || '',
        profilePic: user?.profilePic || '',
        userLocation: user?.userLocation || ''
    });
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleEditClick = (field) => {
        setEditMode({ ...editMode, [field]: true });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
        if (name === 'MobilePhone' || name === 'username') {
            setError('');
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handlePhotoChange = async () => {
        if (!selectedFile) {
            setError('Lütfen bir fotoğraf seçin.');
            return;
        }

        const formData = new FormData();
        formData.append('files', selectedFile);
        formData.append('ref', 'user');
        formData.append('refId', user.id);
        formData.append('field', 'profilePic');

        try {
            const response = await updateProfilePhoto(formData);
            setUserData({ ...userData, profilePic: response.profilePic });
            setEditMode({ ...editMode, profilePic: false });
        } catch (error) {
            console.error("Fotoğraf güncelleme işlemi başarısız", error);
            setError('Fotoğraf güncelleme işlemi başarısız.');
        }
    };

    const handleSaveClick = async (field) => {
        if (field === 'MobilePhone' && !validatePhoneNumber(userData.MobilePhone)) {
            setError('Telefon numarası 10 veya 11 haneli olmalı ve yalnızca rakamlardan oluşmalıdır.');
            setEditMode({ ...editMode, [field]: true });
            return;
        }

        if (field === 'username' && !validateUsername(userData.username)) {
            setError('Kullanıcı adı yalnızca harflerden oluşmalıdır.');
            setEditMode({ ...editMode, [field]: true });
            return;
        }

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

    const handleCancelClick = (field) => {
        setEditMode({ ...editMode, [field]: false });
        setUserData({ ...userData, [field]: user[field] || '' });
        setError('');
    };

    return (
        <div className="personal-info-subsetting-column">
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Profil Fotoğrafı
                    <img className="subsetting-pp" src={userData.profilePic ? userData.profilePic.formats?.thumbnail?.url || userData.profilePic.url : ''} alt="profile-pic" />
                </h3>
                <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('profilePic')} />
                {editMode.profilePic && (
                    <div className='edit-photo-div'>
                        <input
                            className='input-photo-subsetting'
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <button className='subsetting-btn' onClick={handlePhotoChange}>Fotoğrafı Değiştir</button>
                        <button className='subsetting-cancel' onClick={() => handleCancelClick('profilePic')}>İptal</button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                )}
            </div>

            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Kullanıcı Adı</h3>
                {editMode.username ? (
                    <div className='subsetting-div'>
                        <input
                            className='input-username-subsetting'
                            type="text"
                            name="username"
                            value={userData.username}
                            onChange={handleInputChange}
                        />
                        <div className='subsetting-buttons-div'>
                            <button className='subsetting-btn' onClick={() => handleSaveClick('username')}>Onayla</button>
                            <button className='subsetting-cancel' onClick={() => handleCancelClick('username')}>İptal</button>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                ) : (
                    <div className='subsetting-div-other'>
                        <p className="subsetting-paragraph">{user?.username || 'Kullanıcı Adı'}</p>
                        <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('username')} />
                    </div>
                )}
            </div>

            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">E-posta Adresi</h3>
                {editMode.email ? (
                    <div className='subsetting-buttons-div'>
                        <input
                            className='input-username-subsetting'
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                        <button className='subsetting-btn' onClick={() => handleSaveClick('email')}>Onayla</button>
                        <button className='subsetting-cancel' onClick={() => handleCancelClick('email')}>İptal</button>
                    </div>
                ) : (
                    <div className='subsetting-div-other'>
                        <p className="subsetting-paragraph">{user?.email || 'E-posta Adresi bilgisi yok'}</p>
                        <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('email')} />
                    </div>
                )}
            </div>

            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Şifre</h3>
                {editMode.password ? (
                    <div className='subsetting-buttons-div'>
                        <input
                            className='input-username-subsetting'
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleInputChange}
                        />
                        <button className='subsetting-btn' onClick={() => handleSaveClick('password')}>Onayla</button>
                        <button className='subsetting-cancel' onClick={() => handleCancelClick('password')}>İptal</button>
                    </div>
                ) : (
                    <div className='subsetting-div-other'>
                        <p className="subsetting-paragraph">*********</p>
                        <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('password')} />
                    </div>
                )}
            </div>

            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Konum</h3>
                {editMode.userLocation ? (
                    <div className='subsetting-buttons-div'>
                        <input
                            className='input-username-subsetting'
                            type="text"
                            name="userlocation"
                            value={userData.userLocation}
                            onChange={handleInputChange}
                        />
                        <button className='subsetting-btn' onClick={() => handleSaveClick('userlocation')}>Onayla</button>
                        <button className='subsetting-cancel' onClick={() => handleCancelClick('userlocation')}>İptal</button>
                    </div>
                ) : (
                    <div className='subsetting-div-other'>
                        <p className="subsetting-paragraph">{user?.userLocation || 'konum bilgisi yok'}</p>
                        <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('userlocation')} />
                    </div>
                )}
            </div>

            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Telefon</h3>
                {editMode.MobilePhone ? (
                    <div className='subsetting-buttons-div'>
                        <input
                            className='input-username-subsetting'
                            type="text"
                            name="MobilePhone"
                            value={userData.MobilePhone}
                            onChange={handleInputChange}
                        />
                        <button className='subsetting-btn' onClick={() => handleSaveClick('MobilePhone')}>Onayla</button>
                        <button className='subsetting-cancel' onClick={() => handleCancelClick('MobilePhone')}>İptal</button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                ) : (
                    <div className='subsetting-div-other'>
                        <p className="subsetting-paragraph">{user?.MobilePhone || 'Telefon bilgisi yok'}</p>
                        <img className="edit-pencil-subsetting" src={editPencil} alt="edit" onClick={() => handleEditClick('MobilePhone')} />
                    </div>
                )}
            </div>
            <button className="my-profile-logout" type="button" onClick={handleLogout}>
                Çıkış Yap
            </button>
        </div>
    );
};

export default UserProfile;
