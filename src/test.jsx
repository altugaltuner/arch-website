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
            <div className='other-joined-all'>
                <div className='other-all-projects'>
                    <h2 className='other-joined-projects'>Dahil Olduğu Projeler : </h2>
                    {employee.projects && employee.projects.map((project) => (
                        <div key={project.id} className='other-project'>
                            <p>{project.projectName}</p>
                            {project.projectCoverPhoto && (
                                <img
                                    className="project-photo"
                                    src={`http://localhost:1337${project.projectCoverPhoto.formats?.thumbnail?.url || project.projectCoverPhoto.url}`}
                                    alt={project.projectName}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className='other-all-groups'>
                    <h2 className='other-groups-joined'>Dahil Olduğu Gruplar :</h2>
                    {employee.groups && employee.groups.map((group) => (
                        <div key={group.id} className='other-groups'>
                            <p>{group.groupName}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='other-revises-all'>
                <div className='other-all-revises'>
                    <h2 className='other-revises'>Yazdığı Revizeleri :</h2>
                    {employee.project_revises && employee.project_revises.map((revise) => (
                        <div key={revise.id} className='other-revise'>
                            <p>{revise.comment[0].children[0].text}</p>
                        </div>
                    ))}
                    <div className='other-revise'>Revize1</div>
                    <div className='other-revise'>Revize2</div>
                    <div className='other-revise'>Revize3</div>
                </div>
            </div>
            <input type="file" accept="image/*, video/*" /> {/* kare olacak,çok büyük olmayacak
            gönder butonu da koymam lazım  ayrıca mesaj kutusu da koyucam*/}
        </div>
    );
}

export default OtherUsersInfo;
