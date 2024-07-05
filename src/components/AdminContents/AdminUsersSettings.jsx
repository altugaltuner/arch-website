import React from 'react';
import UserRoleManagement from './UserRoleManagement';
import UserDeletion from './UserDeletion';
import './AdminUsersSettings.scss';

function AdminUserSettings({ users }) {
    return (
        <div className="admin-user-settings-main">
            <div className='admin-send-message-inner'>
                <UserRoleManagement users={users} />
                <UserDeletion users={users} />
            </div>
        </div>
    );
}

export default AdminUserSettings;
