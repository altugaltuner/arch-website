import React, { useState } from 'react';
import './NewReviseModal.scss';
import axios from 'axios';

function NewReviseModal({ isOpen, onClose, onReviseAdded, clickedProject, user }) {
    const [inputValue, setInputValue] = useState('');
    const [selectedState, setSelectedState] = useState(0);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue || !selectedState) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        const currentDate = new Date().toISOString();


        try {
            const response = await axios.post('https://bold-animal-facf707bd9.strapiapp.com/api/project-revises', {
                data: {
                    comment: [
                        {
                            type: 'paragraph',
                            children: [
                                {
                                    type: 'text',
                                    text: inputValue
                                }
                            ]
                        }
                    ],
                    reviseState: parseInt(selectedState, 10),
                    isActive: true,
                    project: { id: clickedProject.id },
                    user: { id: user.id },
                    commentDate: currentDate
                }
            });
            onReviseAdded(response.data);
            onClose();
        } catch (error) {
            console.error('Revize eklenirken bir hata oluştu:', error);
        }
    };

    return (
        <div className="new-revise-modal">
            <div className="revise-modal-content">
                <h2 className='new-revise-modal-header'>Yeni Revize Ekle</h2>
                <form className='new-revise-modal-form' onSubmit={handleSubmit}>
                    <input
                        className='new-revise-modal-input'
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Revize girin"
                    />
                    <div className='new-revise-checkbox-div'>
                        <label htmlFor="new-revise-radio">Revize Durumu:</label>

                        <div className='new-revise-div-one'>
                            <input type="radio" id="new-revise-radio1" name="new-revise-radio" value="1" onChange={(e) => setSelectedState(e.target.value)} />
                            <label htmlFor="new-revise-radio1">Yapılacak</label>
                        </div>
                        <div className='new-revise-div-one'>
                            <input type="radio" id="new-revise-radio2" name="new-revise-radio" value="2" onChange={(e) => setSelectedState(e.target.value)} />
                            <label htmlFor="new-revise-radio2">İşleme Alındı</label>
                        </div>
                        <div className='new-revise-div-one'>
                            <input type="radio" id="new-revise-radio3" name="new-revise-radio" value="3" onChange={(e) => setSelectedState(e.target.value)} />
                            <label htmlFor="new-revise-radio3">Tamamlandı</label>
                        </div>
                        <div className='new-revise-div-one'>
                            <input type="radio" id="new-revise-radio4" name="new-revise-radio" value="4" onChange={(e) => setSelectedState(e.target.value)} />
                            <label htmlFor="new-revise-radio4">İptal Edildi</label>
                        </div>
                    </div>
                    <div className='new-revise-buttons-div'>
                        <button className='new-revise-submit-btn' type="submit">Gönder</button>
                        <button className='new-revise-submit-cancel' onClick={onClose}>Kapat</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewReviseModal;
