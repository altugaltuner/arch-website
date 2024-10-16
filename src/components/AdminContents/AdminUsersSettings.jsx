import { useEffect, useState } from 'react';
import UserRoleManagement from './UserRoleManagement';
import UserDeletion from './UserDeletion';
import AdminGroupSettings from './AdminGroupSettings.';
import './AdminUsersSettings.scss';
import axios from 'axios';

function AdminUserSettings({ users }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState(null);

    const getProjectDetails = async () => {
        const endpoint = `https://wonderful-pleasure-64045d06ec.strapiapp.com/api/projects?populate=*`;
        try {
            setLoading(true);
            const { data } = await axios.get(endpoint);
            setProjects(data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProjectDetails();
    }, []);

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>Hata: {error.message}</div>;
    }

    return (
        <div className="admin-user-settings-main">
            <div className='admin-send-message-inner'>
                <AdminGroupSettings />
                <div className="projects-list">
                    <h2 className='projects-codes-h2'>Proje Klasör Kodları</h2>
                    {projects ? projects.map((project) => (
                        <div className='projects-list-one-div' key={project.id}>
                            <p className='project-list-projectname'>{project.attributes.projectName}</p>
                            <p className='project-list-projectPassword'>{project.attributes?.projectPassword || "Şifresi yok"}</p>

                        </div>
                    )) : "Proje bulunamadı."}
                </div>
                <UserRoleManagement users={users} />
                <div className='user-storage-gb-div'>
                    <h2 className='user-storage-gb-h2'>Kullanıcı Depolama Alanları</h2>
                    <div className='user-storage-gb-inner'>
                        {users.map((user) => (
                            <div className='user-storage-gb-one-div' key={user.id}>
                                <p className='user-storage-username'>{user.attributes.username}</p>
                                <p className='user-storage-userstorage'>{user.attributes.storageGB || "2.78/5"}  GB</p>
                            </div>
                        ))}
                    </div>
                </div>
                <UserDeletion users={users} />
            </div>
        </div>
    );
}

export default AdminUserSettings;
