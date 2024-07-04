import React from 'react';
import "./AdminUsersSettings.scss";

function AdminUserSettings({ users }) {

    console.log("usersaaa", users);
    return (
        <div className="admin-user-settings-main">
            <div className='admin-send-message-inner'>
                <div className='user-set-one-div'>
                    <h2 className='set-one-header'>Kullanıcı Rol ve İzinleri Yönetme</h2>
                    <div className='user-role-permission-div'>
                        <label htmlFor="user-role"><input type="text" placeholder='kullanıcı ara' /></label>
                        <select name="user-role" id="user-role">
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <button className='role-permission-button'>Rolü Değiştir</button>
                    </div>
                </div>
                <div className='user-set-one-div'>
                    <h2 className='set-one-header'>Kullanıcı Silme</h2>
                    <label htmlFor="delete-user"><input type="text" placeholder='kullanıcı ara' /></label>
                    <button className='delete-user-button'>Kullanıcı Sil</button>
                    <div className='searched-user-for-deletion'>
                        {users.map(user => (
                            <div key={user.attributes.id}>{user.attributes.username}</div>
                        ))}
                    </div>
                </div>
                <div className='user-set-one-div'>
                    <h2 className='set-one-header'>Şirket Dışı Çalışan Bilgileri</h2>
                    <div className='outer-company-users-data-div'>
                        <img src="" alt="excel-logo" />
                        <img src="" alt="word-logo" />
                        <img src="" alt="png-logo" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminUserSettings;