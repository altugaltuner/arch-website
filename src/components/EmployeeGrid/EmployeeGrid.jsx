import React from 'react';
import './EmployeeGrid.scss';
import { useAuth } from "../../components/AuthProvider";

function EmployeeGrid({ employees, openEmployeeCardModal }) {

    const { user } = useAuth();
    const filteredEmployees = employees.filter(employee => employee.username !== user.username);


    return (
        <div className="employee-grid-container">
            <div className="employee-grid">
                {filteredEmployees.map((employee, index) => (
                    <div className="employee-card" key={index} onClick={() => openEmployeeCardModal(employee)}>
                        <div className="profile-pic">
                            <img
                                className="profile-pic-inner"
                                src={employee.profilePic ? `http://localhost:1337${employee.profilePic.data.attributes.url}` : ""}
                                alt=""
                            />
                        </div>
                        <div className="employee-info">
                            <h3>{employee.username}</h3>
                            <p>{employee.email}</p>
                            <p>{employee?.profession?.data?.attributes?.professionName || "Yok"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmployeeGrid;
