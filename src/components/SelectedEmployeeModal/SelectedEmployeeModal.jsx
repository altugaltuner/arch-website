import React from 'react';
import './SelectedEmployeeModal.scss';
import { Link } from 'react-router-dom';

function SelectedEmployeeModal({ employee, onClose }) {
    if (!employee) {
        return null;
    }

    return (
        <div className="employee-card-modal">
            <div className="employee-card-modal-inner">
                <div className="employee-card-modal-profile-pic">
                    <img
                        className="employee-card-modal-profile-pic-inner"
                        src={employee?.profilePic?.url || employee.profilePic?.formats?.thumbnail?.url}
                        alt=""
                    />
                </div>
                <p className='employee-card-modal-username'>{employee?.username}</p>
                <p className='employee-card-modal-email'>{employee?.email}</p>
                <p className='employee-card-modal-professionname'>{employee?.profession?.professionName}</p>
                <div className='employee-card-selected-employee-buttons'>
                    <Link to="/workers" className="employee-card-go-to-profile">Sayfasına Git</Link>
                </div>

                <button className="global-close-button" onClick={onClose}>
                    X
                </button>
            </div>
        </div>
    );
}

export default SelectedEmployeeModal;
