import React from 'react';
import './OtherUsersInfo.scss';

function OtherUsersInfo({ employee }) {

    if (!employee) {
        return (
            <div className="other-info-main">
                <h1 className='other-info-header'>Görüntülemek istediğiniz çalışanı seçin.</h1>
            </div>
        );
    }

    return (
        <div className="other-info-main">
            <div className='revise-and-profile'>
                <div className='other-info-inner'>
                    <div className='other-info-inner-2'>
                        <img
                            className="other-info-profile-pic"
                            src={`http://localhost:1337${employee.profilePic?.url || ""}`}
                            alt=""
                        />
                        <p className='other-info-username'>{employee.username}</p>
                        <p className='other-info-email'>{employee.email}</p>
                        <p className='other-info-professionname'>{employee.profession.professionName}</p>
                    </div>
                </div>
                <div className='other-all-revises-inner'>
                    <h2 className='other-revises-h2'>Revizeler</h2>

                    {employee.project_revises && employee.project_revises.map((revise) => (
                        <div key={revise.id} className='other-revise-div'>
                            <p className='other-revise-p'>{revise.comment[0].children[0].text}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='other-joined-all'>
                <div className='other-all-projects'>
                    <h2 className='other-joined-projects-h2'>Dahil Olduğu Projeler</h2>
                    <div className='other-column'>
                        {employee.projects && employee.projects.map((project) => (
                            <div key={project.id} className='other-project-div'>
                                <p className='other-project-p'>{project.projectName}</p>
                                {project.projectCoverPhoto && (
                                    <img
                                        className="other-project-photo"
                                        src={`http://localhost:1337${project.projectCoverPhoto.formats?.thumbnail?.url || project.projectCoverPhoto.url}`}
                                        alt={project.projectName}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='other-all-groups'>
                <h2 className='other-groups-joined-h2'>Dahil Olduğu Gruplar</h2>
                {employee.groups && employee.groups.map((group) => (
                    <div key={group.id} className='other-groups'>
                        <p className='other-groups-name'>{group.groupName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OtherUsersInfo;
