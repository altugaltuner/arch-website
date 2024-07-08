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
                <h2>{projectName} Projesi İçin Şifre Girin</h2>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Şifre"
                />
                <div className="modal-buttons">
                    <button onClick={handleConfirm}>Onayla</button>
                    <button onClick={onClose}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default PasswordModal;
