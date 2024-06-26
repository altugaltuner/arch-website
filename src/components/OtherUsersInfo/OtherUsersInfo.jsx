import React from 'react';
import './OtherUsersInfo.scss';

function OtherUsersInfo({ employee }) {
    if (!employee) {
        return (
            <div className="other-info-main">
                <h1 className='other-info-header'>Görüntülemek istediğiniz çalışanı seçin.</h1>
            </div>
        );
    };

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
                    <div className='other-project'>Proje1</div>
                    <div className='other-project'>Proje2</div>
                    <div className='other-project'>Proje3</div>
                </div>
                <div className='other-all-groups'>
                    <h2 className='other-groups-joined'>Dahil Olduğu Gruplar :</h2>
                    <div className='other-groups'>Grup1</div>
                    <div className='other-groups'>Grup2</div>
                    <div className='other-groups'>Grup3</div>
                </div>
            </div>
            <div className='other-revises-all'>
                <div className='other-all-revises'>
                    <h2 className='other-revises'>Revizeleri : </h2>
                    <div className='other-revise'>Revize1</div>
                    <div className='other-revise'>Revize2</div>
                    <div className='other-revise'>Revize3</div>
                </div>
            </div>
            <input type="file" accept="image/*, video/*" /> {/* kare olacak,çok büyük olmayacak
            gönder butonu da koymam lazım */}
        </div>
    );
}

export default OtherUsersInfo;
