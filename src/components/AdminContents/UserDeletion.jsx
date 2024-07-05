import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDeletion({ users }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.attributes.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, users]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUserSelect = (userId) => {
        setSelectedUsers((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter(id => id !== userId);
            } else {
                return [...prevSelected, userId];
            }
        });
    };

    const handleDeleteUsers = async () => {
        try {
            for (const userId of selectedUsers) {
                await axios.delete(`http://localhost:1337/api/users/${userId}`);
            }
            // Silme işlemi başarılı olduktan sonra kullanıcı listesini güncelle
            setFilteredUsers(filteredUsers.filter(user => !selectedUsers.includes(user.id)));
            setSelectedUsers([]);
        } catch (error) {
            console.error('Error deleting users:', error);
        }
    };

    return (
        <div className='user-set-one-div'>
            <h2 className='set-one-header'>Kullanıcı Sil</h2>
            <label htmlFor="delete-user" className='delete-user-label'>
                <input
                    className='delete-user-input'
                    type="text"
                    placeholder='kullanıcı ara'
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </label>
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
            <button className='delete-user-button' onClick={handleDeleteUsers}>Kullanıcı Sil</button>
        </div>
    );
}

export default UserDeletion;