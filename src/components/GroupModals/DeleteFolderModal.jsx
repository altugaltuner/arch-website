import "./DeleteFolderModal.scss";

function DeleteFolderModal({ showDeleteModal, setShowDeleteModal, handleDeleteFolder }) {
    if (!showDeleteModal) return null;

    return (
        <div className="delete-folder-modal">
            <div className="delete-folder-modal-content">
                <span className="global-close-button" onClick={() => setShowDeleteModal(false)}>X</span>
                <h2 className="delete-folder-header"> Proje Klasörü Sil</h2>
                <p className="delete-folder-p">Proje klasörünü gerçekten silmek istiyor musunuz?</p>
                <div className='delete-folder-buttons-div'>
                    <button className="delete-folder-btn-yes" onClick={handleDeleteFolder}>Evet</button>
                    <button className="delete-folder-btn-no" onClick={() => setShowDeleteModal(false)}>Hayır</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteFolderModal;
