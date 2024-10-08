import React, { useState } from 'react';
import './PasswordModal.scss';

const PasswordModal = ({ isOpen, onClose, onConfirm, projectName }) => {
    const [password, setPassword] = useState('');

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirm = () => {
        onConfirm(password);
    };

    if (!isOpen) return null;

    return (
        <div className="password-modal-overlay">
            <div className="password-modal">
                <span className="global-close-button" onClick={onClose}>X</span>
                <h2 className='modal-header'>{projectName} İçin Şifre Girin</h2>
                <input
                    className='password-modal-input'
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Şifre"
                    autoComplete="new-password"
                />
                <div className="modal-buttons">
                    <button className='confirm-button' onClick={handleConfirm}>Giriş Yap</button>
                    <button className='cancel-button' onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordModal;
