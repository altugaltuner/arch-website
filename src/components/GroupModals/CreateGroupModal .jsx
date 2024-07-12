import React, { useState, useEffect } from 'react';
import './CreateGroupModal.scss';

const CreateGroupModal = ({ showModal, setShowModal, newGroup, handleInputChange, handleSubmit }) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [groupCode, setGroupCode] = useState('');

    useEffect(() => {
        if (showModal) {
            setErrorMessage('');
            setGroupCode('');
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

    const handleGroupCodeChange = (e) => {
        setGroupCode(e.target.value);
        setErrorMessage('');
    };

    const handleFormSubmit = () => {
        if (newGroup.groupName.length > 40) {
            setErrorMessage('Grup adı en fazla 40 karakter olabilir.');
            return false;
        }
        if (!groupCode) {
            setErrorMessage('Grup şifresi giriniz.');
            return false;
        }
        handleSubmit(groupCode);
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
                />
                <input
                    type="text"
                    className='create-group-code-input'
                    name='group-code'
                    value={groupCode}
                    placeholder='Grup şifresi oluştur'
                    onChange={handleGroupCodeChange}
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
