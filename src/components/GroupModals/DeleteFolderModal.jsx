import { useState, useEffect } from "react";
import axios from 'axios';
import "./DeleteFolderModal.scss";

function DeleteFolderModal({ showDeleteModal, setShowDeleteModal, handleDeleteFolder }) {
    if (!showDeleteModal) return null;

    return (
        <div className="delete-folder-modal">
            <div className="delete-folder-modal-content">
                <span className="delete-folder-close" onClick={() => setShowDeleteModal(false)}>X</span>
                <h2 className="delete-folder-header">Grubu Sil</h2>
                <p className="delete-folder-p">Grubu gerçekten silmek istiyor musunuz?</p>
                <div className='delete-folder-buttons-div'>
                    <button className="delete-folder-btn-yes" onClick={handleDeleteFolder}>Evet</button>
                    <button className="delete-folder-btn-no" onClick={() => setShowDeleteModal(false)}>Hayır</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteFolderModal;