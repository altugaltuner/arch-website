const CreateGroupModal = ({ showModal, setShowModal, newGroup, handleInputChange, handleSubmit }) => {
    if (!showModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setShowModal(false)}>X</span>
                <h2>Yeni Grup Oluştur</h2>
                <input
                    type="text"
                    name="groupName"
                    value={newGroup.groupName}
                    onChange={handleInputChange}
                    placeholder="Grup Adı"
                />
                <input
                    type="password"
                    name="groupPassword"
                    value={newGroup.groupPassword}
                    onChange={handleInputChange}
                    placeholder="Grup Şifresi"
                />
                <button onClick={handleSubmit}>Oluştur</button>
            </div>
        </div>
    );
};
