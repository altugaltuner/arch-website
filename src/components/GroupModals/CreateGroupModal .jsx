import React, { useState, useEffect } from 'react';
import './CreateGroupModal.scss';

const CreateGroupModal = ({ showModal, setShowModal, newGroup, handleInputChange, handleSubmit }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [groupPassword, setGroupPassword] = useState('');

    useEffect(() => {
        if (showModal) {
            setErrorMessage('');
            setGroupPassword('');
        }
    }, [showModal]);

    if (!showModal) return null;

    const handleGroupNameChange = (e) => {
        const { value } = e.target;
        if (value.length <= 40) {
            handleInputChange(e);
            setErrorMessage('');
        } else {
            setErrorMessage('Grup adı en fazla 40 karakter olabilir.');
        }
    };

    const handleGroupPasswordChange = (e) => {
        handleInputChange({ target: { name: 'groupPassword', value: e.target.value } });
        setErrorMessage('');
    };

    const handleFormSubmit = () => {
        if (newGroup.groupName.length > 40) {
            setErrorMessage('Grup adı en fazla 40 karakter olabilir.');
            return false;
        }
        if (!newGroup.groupPassword) {
            setErrorMessage('Grup şifresi giriniz.');
            return false;
        }
        handleSubmit(newGroup);
    };

    return (
        <div className="create-group-modal">
            <div className="create-group-modal-content">
                <span className="create-group-close-group-modal" onClick={() => setShowModal(false)}>X</span>
                <h2 className='create-group-modal-header'>Yeni Grup Oluştur</h2>
                <input
                    className='create-group-modal-name-input'
                    type="text"
                    name="groupName"
                    placeholder="Grup Adı"
                    value={newGroup.groupName}
                    onChange={handleGroupNameChange}
                    autoComplete="off"
                />
                <input
                    type="password"
                    className='create-group-code-input'
                    name='groupPassword'
                    value={newGroup.groupPassword}
                    placeholder='Grup Şifresi'
                    onChange={handleGroupPasswordChange}
                />
                {errorMessage && <p className='error-message'>{errorMessage}</p>}
                <div className='create-group-button-div-group'>
                    <button className='create-group-modal-div-create-btn' onClick={handleFormSubmit}>Oluştur</button>
                    <button className='create-group-modal-div-cancel-btn' onClick={() => setShowModal(false)}>İptal</button>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupModal;
