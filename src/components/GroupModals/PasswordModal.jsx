import React, { useState } from 'react';
import './PasswordModal.scss';

const PasswordModal = ({ showPasswordModal, setShowPasswordModal, password, setPassword, handlePasswordSubmit, errorMessage }) => {
    const [localErrorMessage, setLocalErrorMessage] = useState('');

    const handleChange = (e) => {
        setPassword(e.target.value);
        setLocalErrorMessage('');
    };

    const handleSubmit = async () => {
        if (!password) {
            setLocalErrorMessage('Şifre giriniz.');
        } else {
            const result = await handlePasswordSubmit();
            if (!result.success) {
                setLocalErrorMessage(result.message || 'Yanlış şifre.');
            }
        }
    };

    if (!showPasswordModal) return null;

    return (
        <div className="password-modal">
            <div className="password-modal-content">
                <span className="password-modal-close" onClick={() => setShowPasswordModal(false)}>X</span>
                <h2 className='password-modal-header'>Grup Şifresi</h2>
                <input
                    type="password"
                    value={password}
                    onChange={handleChange}
                    placeholder="Şifre giriniz"
                />
                {(localErrorMessage || errorMessage) && <p className="error-message">{localErrorMessage || errorMessage}</p>}
                <div className="password-modal-buttons">
                    <button className='password-modal-one-btn' onClick={handleSubmit}>Giriş Yap</button>
                    <button className='password-modal-one-btn' onClick={() => setShowPasswordModal(false)}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordModal;
