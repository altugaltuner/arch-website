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
                                src={employee?.profilePic ? `https://bold-animal-facf707bd9.strapiapp.com${employee?.profilePic?.data?.attributes?.url || employee?.profilePic?.data?.attributes?.formats?.thumbnail?.url}` : ""}
                                alt=""
                            />
                        </div>
                        <div className="employee-info">
                            <h3>{employee.username}</h3>
                            <p>{employee.email}</p>
                            <p>{employee?.profession?.data?.attributes?.professionName || "Henüz Belirtilmedi"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EmployeeGrid;
