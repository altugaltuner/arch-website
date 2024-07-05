import "./AdminContent.scss";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";
import { useEffect, useState } from "react";
import AdminCompanySettings from "../../components/AdminContents/AdminCompanySettings";
import AdminDashboard from "../../components/AdminContents/AdminDashboard";
import AdminUsersSettings from "../../components/AdminContents/AdminUsersSettings";
import AdminSupportSettings from '../../components/AdminContents/AdminSupportSettings';
import AdminSendMessage from '../../components/AdminContents/AdminSendMessage';

function AdminContent({ selectedSetting }) {
    const { user } = useAuth();
    console.log("userss", user);
    const usersCompanyName = user?.company?.companyName;

    const [companies, setCompanies] = useState([]);
    const [filteredCompany, setFilteredCompany] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/companies?populate=*,users.access');
                setCompanies(response.data.data);
                console.log("resss", response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (companies.length && usersCompanyName) {
            const filterCompanyFunction = () => {
                return companies.filter(company => company.attributes.companyName === usersCompanyName);
            };
            setFilteredCompany(filterCompanyFunction());
        }
    }, [companies, usersCompanyName]);

    if (!filteredCompany.length) {
        return <div>Loading...</div>;
    }

    const projectCount = filteredCompany[0]?.attributes?.projects?.data?.length || 0;
    const userCount = filteredCompany[0]?.attributes?.users?.data?.length || 0;
    const reviseCount = filteredCompany[0]?.attributes?.project_revises?.data?.length || 0;

    const users = filteredCompany[0]?.attributes?.users?.data?.map(user => {
        const accessRole = user.attributes.access?.data?.attributes?.role || 'Spectator';
        return {
            ...user,
            access: { role: accessRole }
        };
    }) || [];

    console.log("users with access roles:", users);

    const renderContent = () => {
        switch (selectedSetting) {
            case "Dashboard":
                return <AdminDashboard projectCount={projectCount} userCount={userCount} reviseCount={reviseCount} />;
            case "İleti Gönderme":
                return <AdminSendMessage />;
            case "Kullanıcı Ayarları":
                return <AdminUsersSettings users={users} />;
            case "Şirket Ayarları":
                return <AdminCompanySettings />;
            case "Destek ve Geri Bildirim":
                return <AdminSupportSettings />;
            default:
                return null;
        }
    };

    return (
        <div className="admin-sub-setting-page">
            <h2 className="admin-sub-header">{selectedSetting}</h2>
            <div className='admin-sub-panel-content'>
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminContent;
