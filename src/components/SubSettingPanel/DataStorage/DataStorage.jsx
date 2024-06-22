import editPencil from '../../../assets/icons/edit-pencil.png';
import React from 'react';

const DataStorage = () => (
    <div className="personal-info-subsetting-column">
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Veri yedekleme ve geri yükleme seçenekleri</h3>
            <p className="subsetting-paragraph">Veri yedekleme</p>
            <p className="subsetting-paragraph">Verileri geri yükle</p>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Depolama kullanımı ve yönetimi</h3>
            <p className="subsetting-paragraph">Abonelik Planınız : Premium</p>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
        <div className="personal-info-subsetting-oneline">
            <h3 className="subsetting-header">Arşivleme seçenekleri</h3>
            <p className="subsetting-paragraph">Arşivleme</p>
            <img className="edit-pencil-subsetting" src={editPencil} alt="edit" />
        </div>
    </div>
);

export default DataStorage;
