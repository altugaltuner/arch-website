import React, { useState } from 'react';
import './PasswordModal.scss';

const PasswordModal = ({ showPasswordModal, setShowPasswordModal, password, setPassword, handlePasswordSubmit }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
        setErrorMessage('');
    };

    const handleSubmit = () => {
        if (!password) {
            setErrorMessage('Şifre giriniz.');
        } else {
            handlePasswordSubmit();
        }
    };

    if (!showPasswordModal) return null;

    return (
        <div className="password-modal">
            <div className="password-modal-content">
                <span className="password-modal-close" onClick={() => setShowPasswordModal(false)}>X</span>
                <h2>Grup Şifresi</h2>
                <input
                    type="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Şifre giriniz"
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="password-modal-buttons">
                    <button onClick={handleSubmit}>Giriş Yap</button>
                    <button onClick={() => setShowPasswordModal(false)}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordModal;
