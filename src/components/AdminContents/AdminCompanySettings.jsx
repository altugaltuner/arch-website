import { useState, useEffect } from "react";
import "./AdminCompanySettings.scss";
import { useAuth } from "../../components/AuthProvider";
import editPencil from "../../assets/icons/edit-pencil.png";

const AdminCompanySettings = () => {
    const { user } = useAuth();

    const [companyName, setCompanyName] = useState("");
    useEffect(() => {
        setCompanyName(user.company.companyName);
    }, [user]);

    const [companyLogo, setCompanyLogo] = useState("");
    useEffect(() => {
        setCompanyLogo(user.company.companyLogo?.url || "");
    }, [user]);

    const [companySubscription, setCompanySubscription] = useState("0GB");
    useEffect(() => {
        setCompanySubscription(user.company.companySubscription);
    }, [user]);

    const [companyWorkingArea, setCompanyWorkingArea] = useState("");
    useEffect(() => {
        setCompanyWorkingArea(user.company.workingArea);
    }, [user]);

    const [companyDesc, setCompanyDesc] = useState("");
    useEffect(() => {
        setCompanyDesc(user.company.companyDesc);
    }, [user]);

    const [companyEmail, setCompanyEmail] = useState("");
    useEffect(() => {
        setCompanyEmail(user.company.companyEmail);
    }, [user]);

    const [companyPhone, setCompanyPhone] = useState("");
    useEffect(() => {
        setCompanyPhone(user.company.companyPhone);
    }, [user]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('files', file);

        try {
            // Dosyayı yükle
            const uploadResponse = await fetch('http://localhost:1337/api/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadResult = await uploadResponse.json();
            const newLogoId = uploadResult[0].id; // Dosya ID'sini al

            // Şirket logosunu güncelle
            await fetch(`http://localhost:1337/api/companies/${user.company.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        companyLogo: newLogoId, // Yeni dosya ID'sini kullan
                    },
                }),
            });

            setCompanyLogo(uploadResult[0].url); // Yeni logo URL'sini güncelle
        } catch (error) {
            console.error("Dosya yükleme hatası:", error);
        }
    };

    return (
        <div className="admin-company-settings-main">
            <div className="admin-company-inner">
                <h2 className="admin-company-header">Şirket Profili</h2>
                <p className="admin-company-p"><span>Şirket Adı : </span>{companyName || "none"}</p>
                <p className="admin-company-p"><span>Şirket Çalışma Alanı : </span>{companyWorkingArea || "none"}</p>
                <p className="admin-company-p"><span>Şirket Açıklaması : </span>{companyDesc || "none"}</p>
                <p className="admin-company-p"><span>Şirket Emaili : </span>{companyEmail || "none"}</p>
                <p className="admin-company-p"><span>Şirket Telefonu : </span>{companyPhone || "none"}</p>
                <button className="admin-company-edit-button">Düzenle</button>

                <div className="company-logo-div">
                    <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                    <label htmlFor="file-upload" className="custom-file-upload">
                        <img className="edit-pencil-company-logo-edit" src={editPencil} alt="edit-pencil" />
                    </label>
                    {companyLogo ? (
                        <img className="company-logo-img" src={`http://localhost:1337${companyLogo}`} alt="company-logo" />
                    ) : (
                        <div className="company-logo-placeholder">Şirket logosu yükleyin</div>
                    )}
                </div>
            </div>
            <div className="admin-company-inner">{ }</div>
            <div className="admin-company-inner">
                <h2 className="admin-company-header">Şirket Aboneliğini Yönet</h2>
                <p className="admin-company-p">Aktif Abonelik : {companySubscription || "none"} GB </p>
            </div>

        </div>
    );
};

export default AdminCompanySettings;
