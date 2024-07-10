import { useEffect, useState } from 'react';
import UserRoleManagement from './UserRoleManagement';
import UserDeletion from './UserDeletion';
import UserProfessionEdit from "./UserProfessionEdit";
import AdminGroupSettings from './AdminGroupSettings.';
import AdminProjectSettings from "./AdminProjectSettings";
import './AdminUsersSettings.scss';
import axios from 'axios';

function AdminUserSettings({ users }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState(null);

    const getProjectDetails = async () => {
        const endpoint = `http://localhost:1337/api/projects?populate=*`;
        try {
            setLoading(true);
            const { data } = await axios.get(endpoint);
            setProjects(data.data);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProjectDetails();
    }, []); // Boş array bağımlılığı, sadece ilk render'da çalışır.

    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (error) {
        return <div>Hata: {error.message}</div>;
    }

    return (
        <div className="admin-user-settings-main">
            <div className='admin-send-message-inner'>
                <AdminProjectSettings />
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
                <UserProfessionEdit users={users} />
                <UserDeletion users={users} />
            </div>
        </div>
    );
}

export default AdminUserSettings;
