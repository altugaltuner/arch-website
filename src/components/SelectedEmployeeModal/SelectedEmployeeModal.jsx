import React from 'react';
import './SelectedEmployeeModal.scss';

function SelectedEmployeeModal({ employee, onClose, sendEmail }) {
    if (!employee) {
        return null;
    }

    return (
        <div className="employee-card-modal">
            <div className="employee-card-modal-inner">
                <div className="profile-pic">
                    <img
                        className="profile-pic-inner"
                        src={`http://localhost:1337${employee.profilePic?.url || ""}`}
                        alt=""
                    />
                </div>
                <p>{employee.username}</p>
                <p>{employee.email}</p>
                <p>{employee.profession.professionName}</p>
                <div className='selected-employee-buttons'>
                    <button className="send-email-btn" onClick={() => sendEmail(employee.email)}>
                        E-posta Gönder
                    </button>
                    <button className='send-private-message'>İleti Gönder</button>
                </div>

                <button className="modal-close-btn" onClick={onClose}>
                    X
                </button>
            </div>
        </div>
    );
}

export default SelectedEmployeeModal;
