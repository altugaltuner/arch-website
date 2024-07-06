import { useState, useEffect } from "react";
import "./AdminCompanySettings.scss";
import { useAuth } from "../../components/AuthProvider";

const AdminCompanySettings = () => {
    const { user } = useAuth();

    const [companyName, setCompanyName] = useState("");
    useEffect(() => {
        setCompanyName(user.company.companyName);
    }, []);

    const [companyLogo, setCompanyLogo] = useState("");
    useEffect(() => {
        setCompanyLogo(user.company.companyLogo.url);
    }, []);

    const [companySubscription, setCompanySubscription] = useState("0GB");

    useEffect(() => {
        setCompanySubscription(user.company.companySubscription);
    }, []);

    return (
        <div className="admin-company-settings-main">
            <div className="admin-company-inner">
                <h2 className="admin-company-header">Şirket Profili</h2>
                <p className="admin-company-p">{companyName}</p>
                <img className="company-logo-img" src={`http://localhost:1337${companyLogo}`} alt="company-logo" />
            </div>

            <div className="admin-company-inner">
                <h2 className="admin-company-header">Şirket Aboneliğini Yönet</h2>
                <p className="admin-company-p">Aktif Abonelik : {companySubscription} GB </p>
            </div>
        </div>
    );
};

export default AdminCompanySettings;
