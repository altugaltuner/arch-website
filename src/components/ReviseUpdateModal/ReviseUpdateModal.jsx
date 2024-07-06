import React, { useState } from 'react';
import './ReviseUpdateModal.scss';
import axios from 'axios';

function ReviseUpdateModal({ isOpen, onClose, revise, onReviseUpdated }) {
    const [inputValue, setInputValue] = useState(revise.text);
    const [selectedState, setSelectedState] = useState(revise.reviseState);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue || !selectedState) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:1337/api/project-revises/${revise.id}`, {
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
                }
            });

            console.log('API yanıtı:', response.data);
            onReviseUpdated(response.data);
            onClose();
        } catch (error) {
            console.error('Revize güncellenirken bir hata oluştu:', error);
        }
    };

    return (
        <div className="revise-update-modal">
            <div className="revise-modal-content">
                <h2 className='revise-update-modal-header'>Revizeyi Güncelle</h2>
                <form className='revise-update-modal-form' onSubmit={handleSubmit}>
                    <input
                        className='revise-update-modal-input'
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Revizeyi güncelle"
                    />
                    <div className='revise-update-checkbox-div'>
                        <label htmlFor="revise-update-radio">Revize Durumu:</label>

                        <div className='revise-update-div-one'>
                            <input type="radio" id="revise-update-radio1" name="revise-update-radio" value="1" checked={selectedState === '1'} onChange={(e) => setSelectedState(e.target.value)} />
                            <label htmlFor="revise-update-radio1">Yapılacak</label>
                        </div>
                        <div className='revise-update-div-one'>
                            <input type="radio" id="revise-update-radio2" name="revise-update-radio" value="2" checked={selectedState === '2'} onChange={(e) => setSelectedState(e.target.value)} />
                            <label htmlFor="revise-update-radio2">İşleme Alındı</label>
                        </div>
                        <div className='revise-update-div-one'>
                            <input type="radio" id="revise-update-radio3" name="revise-update-radio" value="3" checked={selectedState === '3'} onChange={(e) => setSelectedState(e.target.value)} />
                            <label htmlFor="revise-update-radio3">Tamamlandı</label>
                        </div>
                        <div className='revise-update-div-one'>
                            <input type="radio" id="revise-update-radio4" name="revise-update-radio" value="4" checked={selectedState === '4'} onChange={(e) => setSelectedState(e.target.value)} />
                            <label htmlFor="revise-update-radio4">İptal Edildi</label>
                        </div>
                    </div>
                    <div className='revise-update-buttons-div'>
                        <button className='revise-update-submit-btn' type="submit">Güncelle</button>
                        <button className='revise-update-submit-cancel' onClick={onClose}>Kapat</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReviseUpdateModal;
