import React from 'react';
import './SelectedEmployeeModal.scss';

function SelectedEmployeeModal({ employee, onClose, sendEmail }) {
    if (!employee) {
        return null;
    }

    return (
        <div className="employee-card-modal">
            <div className="employee-card-modal-inner">
                <div className="employee-card-modal-profile-pic">
                    <img
                        className="employee-card-modal-profile-pic-inner"
                        src={`http://localhost:1337${employee.profilePic?.url || ""}`}
                        alt=""
                    />
                </div>
                <p className='employee-card-modal-username'>{employee.username}</p>
                <p className='employee-card-modal-email'>{employee.email}</p>
                <p className='employee-card-modal-professionname'>{employee.profession.professionName}</p>
                <div className='employee-card-selected-employee-buttons'>
                    <button className="employee-card-send-email-btn" onClick={() => sendEmail(employee.email)}>
                        E-posta Gönder
                    </button>
                    <button className='employee-card-send-private-message'>İleti Gönder</button>
                </div>

                <button className="employee-card-modal-close-btn" onClick={onClose}>
                    X
                </button>
            </div>
        </div>
    );
}

export default SelectedEmployeeModal;
