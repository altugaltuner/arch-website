import React from 'react';
import './UserPermissionSettings.scss';

function UserPermissionSettings({ employee }) {
    if (!employee) {
        return (
            <div className="user-permission-settings-main">
                <h1 className='user-permission-settings-header'>Çalışan Ayarlarını Düzenlemek için Çalışan Seçin</h1>
            </div>
        );
    };

    return (
        <div className="user-permission-settings-main">
            <div className='user-perm-inner'>
                <div className='user-permission-inner'>
                    <img
                        className="user-permission-profile-pic"
                        src={`http://localhost:1337${employee.profilePic?.url || ""}`}
                        alt=""
                    />
                    <p className='user-permission-settings-username'>{employee.username}</p>
                    <p className='user-permission-settings-email'>{employee.email}</p>
                    <p className='user-permission-settings-professionname'>{employee.profession.professionName}</p>
                </div>
            </div>
            <div className='user-perm-joined-all'>
                <div className='perm-all-projects'>
                    <p className='user-perm-joined-projects'>Dahil Olduğu Projeler : </p>
                    <div className='perm-project'>
                        <img src="" alt="project" />
                        <p className='perm-project-name'>Proje1</p>
                        <div className='project-specific-settings'>
                            <div className='project-spesific-settings-one'>
                                <p className='spesific-setting-one'>Proje dosyalarını açabilme/indirme</p>
                                <p className='spesific-set-toggle'>YES/NO</p>
                            </div>
                            <div className='project-spesific-settings-one'>
                                <p className='spesific-setting-one'>Projeye dosya yükleyebilme,kendi dosyalarını silebilme,değiştirebilme</p>
                                <p className='spesific-set-toggle'>YES/NO</p>
                            </div>
                            <div className='project-spesific-settings-one'>
                                <p className='spesific-setting-one'>Projede başka dosyalara müdahale edebilme</p>
                                <p className='spesific-set-toggle'>YES/NO</p>
                            </div>
                            <div className='project-spesific-settings-one'>
                                <p className='spesific-setting-one'>Projede tam yetki</p>
                                <p className='spesific-set-toggle'>YES/NO</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className='user-perm-joined-groups'>Dahil Olduğu Gruplar : </p>
            </div>

        </div>
    );
}

export default UserPermissionSettings;
