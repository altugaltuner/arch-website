<div className="employees-grid">
    {filteredEmployees.map((employee, index) => (
        <div className="employee-card" key={index} onClick={() => openEmployeeCardModal(employee)}>
            <div className="profile-pic">
                <img className="profile-pic-inner" src={`http://localhost:1337${employee.profilePic.url}`} alt="" srcSet="" />
            </div>
            <div className="employee-info">
                <h3>{employee.username}</h3>
                <p>{employee.email}</p>
                <p>{employee.profession.professionName}</p>
            </div>
        </div>
    ))}
</div>