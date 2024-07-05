import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserRoleManagement({ users }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.attributes.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        console.log("Search term set to:", e.target.value);
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(userId)) {
                console.log(`User ${userId} deselected`);
                return prevSelected.filter(id => id !== userId);
            } else {
                console.log(`User ${userId} selected`);
                return [...prevSelected, userId];
            }
        });
    };

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
        console.log("Role selected:", e.target.value);
    };

    const handleChangeRole = async () => {
        console.log("Selected users for role change:", selectedUsers);
        console.log("Role to be set:", selectedRole);
        try {
            for (const userId of selectedUsers) {
                const user = users.find(user => user.id === userId);
                if (!user) {
                    console.log(`User with ID ${userId} not found`);
                    continue;
                }
                const currentRole = user.access ? user.access.role : 'undefined';
                console.log(`Current role of user ${user.attributes.username}:`, currentRole);
                if (selectedRole && currentRole !== selectedRole) {
                    console.log(`Changing role of user ${user.attributes.username} to ${selectedRole}`);
                    const response = await axios.put(`http://localhost:1337/api/users/${userId}`, {
                        access: {
                            role: selectedRole
                        }
                    });
                    console.log(`Response from Strapi for user ${user.attributes.username}:`, response.data);
                    console.log(`Role of user ${user.attributes.username} changed to ${selectedRole}`);
                } else {
                    console.log(`No role change needed for user ${user.attributes.username}`);
                }
            }
            setFilteredUsers(filteredUsers.map(user => {
                if (selectedUsers.includes(user.id)) {
                    if (!user.access) {
                        user.access = {};
                    }
                    user.access.role = selectedRole;
                }
                return user;
            }));
            setSelectedUsers([]);
            console.log("Role change process completed successfully.");
        } catch (error) {
            console.error('Error changing user roles:', error);
        }
    };

    return (
        <div className='user-set-one-div'>
            <h2 className='set-one-header'>Kullanıcı Rol ve İzinleri Yönetme</h2>
            <div className='user-role-permission-div'>
                <label className='user-search-label' htmlFor="user-role">
                    <input
                        className='user-search-for-role'
                        type="text"
                        placeholder='kullanıcı ara'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </label>
                <select
                    className='search-role-select'
                    name="user-role"
                    id="user-role"
                    value={selectedRole}
                    onChange={handleRoleChange}
                >
                    <option className='option-class-for-role' value="">Rol seç</option>
                    <option className='option-class-for-role' value="Admin">Admin</option>
                    <option className='option-class-for-role' value="Contributor">Contributor</option>
                    <option className='option-class-for-role' value="Spectator">Spectator</option>
                </select>
                <button className='role-permission-button' onClick={handleChangeRole}>Rolü Değiştir</button>
            </div>
            <div className='searched-user-for-deletion'>
                {filteredUsers.map(user => (
                    <div className='to-be-deleted-user-div' key={user.id}>
                        <label className='to-be-label'>
                            <input
                                className='to-be-deleted-user-checkbox'
                                type="checkbox"
                                checked={selectedUsers.includes(user.id)}
                                onChange={() => handleUserSelect(user.id)}
                            />
                            {user.attributes.username}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserRoleManagement;