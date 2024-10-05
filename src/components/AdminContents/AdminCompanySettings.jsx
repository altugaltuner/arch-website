import { useState, useEffect } from "react";
import "./AdminCompanySettings.scss";
import { useAuth } from "../../components/AuthProvider";
import editPencil from "../../assets/icons/edit-pencil.png";

const AdminCompanySettings = () => {
    const { user } = useAuth();

    const [companyName, setCompanyName] = useState("");
    const [companyLogo, setCompanyLogo] = useState("");
    const [companySubscription, setCompanySubscription] = useState("0GB");
    const [companyWorkingArea, setCompanyWorkingArea] = useState("");
    const [companyDesc, setCompanyDesc] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companyPhone, setCompanyPhone] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setCompanyName(user.company.companyName);
        setCompanyLogo(user.company.companyLogo?.url || "");
        setCompanySubscription(user.company.companySubscription);
        setCompanyWorkingArea(user.company.workingArea);
        setCompanyDesc(user.company.companyDesc);
        setCompanyEmail(user.company.companyEmail);
        setCompanyPhone(user.company.companyPhone);
    }, [user]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('files', file);

        try {
            const uploadResponse = await fetch('https://bold-animal-facf707bd9.strapiapp.com/api/upload', {
                method: 'POST',
                body: formData,
            });

            const uploadResult = await uploadResponse.json();
            const newLogoId = uploadResult[0].id;

            await fetch(`https://bold-animal-facf707bd9.strapiapp.com/api/companies/${user.company.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        companyLogo: newLogoId,
                    },
                }),
            });

            setCompanyLogo(uploadResult[0].url);
        } catch (error) {
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const validateInputs = () => {
        const newErrors = {};
        if (!companyName) newErrors.companyName = "Şirket adı boş bırakılamaz";
        if (!companyWorkingArea) newErrors.companyWorkingArea = "Çalışma alanı boş bırakılamaz";
        if (!companyDesc) newErrors.companyDesc = "Açıklama boş bırakılamaz";
        if (!companyEmail) newErrors.companyEmail = "Email boş bırakılamaz";
        if (!/\S+@\S+\.\S+/.test(companyEmail)) newErrors.companyEmail = "Geçersiz email formatı";
        if (!companyPhone) newErrors.companyPhone = "Telefon boş bırakılamaz";
        if (!/^\d{10,12}$/.test(companyPhone)) newErrors.companyPhone = "Telefon numarası 10-12 rakamdan oluşmalıdır";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        try {
            await fetch(`https://bold-animal-facf707bd9.strapiapp.com/api/companies/${user.company.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: {
                        companyName,
                        workingArea: companyWorkingArea,
                        companyDesc,
                        companyEmail,
                        companyPhone,
                    },
                }),
            });
            setIsEditing(false);
        } catch (error) {
        }
    };

    return (
        <div className="admin-company-settings-main">
            <div className="admin-company-inner">
                <h2 className="admin-company-header">Şirket Profili</h2>
                <div className="company-logo-div">
                    <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                    <label htmlFor="file-upload" className="custom-file-upload">
                        <img className="edit-pencil-company-logo-edit" src={editPencil} alt="edit-pencil" />
                    </label>
                    {companyLogo ? (
                        <img className="company-logo-img" src={companyLogo} alt="company-logo" />
                    ) : (
                        <div className="company-logo-placeholder">Şirket logosu yükleyin</div>
                    )}
                </div>

                {isEditing ? (
                    <form className="is-editing-admin-comp" onSubmit={handleSubmit}>
                        <label className="form-label-admin">
                            Adı:
                            <input
                                className="form-input-admin"
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            {errors.companyName && <span>{errors.companyName}</span>}
                        </label>
                        <label className="form-label-admin">
                            Çalışma Alanı:
                            <input
                                className="form-input-admin"
                                type="text"
                                value={companyWorkingArea}
                                onChange={(e) => setCompanyWorkingArea(e.target.value)}
                            />
                            {errors.companyWorkingArea && <span>{errors.companyWorkingArea}</span>}
                        </label>
                        <label className="form-label-admin">
                            Açıklama:
                            <textarea
                                className="form-input-admin-textarea"
                                value={companyDesc}
                                onChange={(e) => setCompanyDesc(e.target.value)}
                            />
                            {errors.companyDesc && <span>{errors.companyDesc}</span>}
                        </label>
                        <label className="form-label-admin">
                            Email:
                            <input
                                className="form-input-admin"
                                type="email"
                                value={companyEmail}
                                onChange={(e) => setCompanyEmail(e.target.value)}
                            />
                            {errors.companyEmail && <span>{errors.companyEmail}</span>}
                        </label>
                        <label className="form-label-admin">
                            Telefon:
                            <input
                                className="form-input-admin"
                                type="text"
                                value={companyPhone}
                                onChange={(e) => setCompanyPhone(e.target.value)}
                            />
                            {errors.companyPhone && <span>{errors.companyPhone}</span>}
                        </label>
                        <div className="form-admin-btns-div">
                            <button className="form-admin-submit-btn" type="submit">Kaydet</button>
                            <button className="form-admin-cancel-btn" type="button" onClick={() => setIsEditing(false)}>İptal</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p className="admin-company-p"><span>Adı: </span>{companyName || "Yok"}</p>
                        <p className="admin-company-p"><span>Çalışma Alanı: </span>{companyWorkingArea || "Yok"}</p>
                        <p className="admin-company-p"><span>Açıklama: </span>{companyDesc || "Yok"}</p>
                        <p className="admin-company-p"><span>Email: </span>{companyEmail || "Yok"}</p>
                        <p className="admin-company-p"><span>Telefon: </span>{companyPhone || "Yok"}</p>
                        <button className="admin-company-edit-button" onClick={handleEditClick}>Düzenle</button>
                    </>
                )}
            </div>
            <div className="admin-company-inner">
                <h2 className="admin-company-header">Şirket Aboneliğini Yönet</h2>
                <p className="admin-company-p">Aktif Abonelik: {companySubscription || "none"} GB </p>
            </div>
        </div>
    );
};

export default AdminCompanySettings;
