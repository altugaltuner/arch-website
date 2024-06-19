import React, { useState, useEffect } from "react";
import "./CompanyCreatePage.scss";
import { useAuth } from "../../components/AuthProvider";

function CompanyCreatePage() {
    const auth = useAuth();
    const [errors, setErrors] = useState({});

    const employeeCodeCreator = () => {
        const employeeCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        document.getElementById("employeeCode").value = employeeCode;
        console.log(employeeCode);
    };

    const validateInputs = (e) => {
        e.preventDefault();
        const companyName = document.getElementById("companyName").value;
        const workingArea = document.getElementById("workingArea").value;
        const adminName = document.getElementById("adminName").value;
        const adminSurname = document.getElementById("adminSurname").value;
        const adminPassword = document.getElementById("adminPassword").value;
        const adminPasswordAgain = document.getElementById("adminPasswordAgain").value;

        let errors = {};

        if (companyName.length > 50) {
            errors.companyName = "Şirket ismi 50 karakterden fazla olamaz.";
        }
        if (workingArea.length > 30) {
            errors.workingArea = "Şirketin çalışma alanı 30 karakterden fazla olamaz.";
        }
        if (adminName.length > 15 || !/^[a-zA-Z]+$/.test(adminName)) {
            errors.adminName = "Admin ismi 15 karakterden fazla olamaz ve sadece harf içermelidir.";
        }
        if (adminSurname.length > 20 || !/^[a-zA-Z]+$/.test(adminSurname)) {
            errors.adminSurname = "Admin soyismi 20 karakterden fazla olamaz ve sadece harf içermelidir.";
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/.test(adminPassword)) {
            errors.adminPassword = "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermeli ve en az 8 karakter uzunluğunda olmalıdır.";
        }
        if (adminPassword !== adminPasswordAgain) {
            errors.adminPasswordAgain = "Şifreler birbiriyle uyuşmuyor.";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            // No errors, submit form
            alert("Form başarıyla gönderildi!");
        }
    };

    return (
        <main className="company-create-page-main">
            <h1 className="company-create-page-title">Şirket Hesabı Açma Sayfası</h1>
            <div className="company-and-admin-create-div">
                <h2 className="company-create-header">Şirket ve Admin Bilgileri</h2>
                <form className="company-admin-create-form" onSubmit={validateInputs}>
                    <div className="company-admin-row-for-btn">
                        <div className="company-create-div">
                            <h3 className="company-create-subheader">Şirket Bilgileri</h3>
                            <label className="company-create-label" htmlFor="companyName">Şirket İsmi</label>
                            <input className="company-create-input" type="text" id="companyName" />
                            {errors.companyName && <span className="error">{errors.companyName}</span>}

                            <label className="company-create-label" htmlFor="workingArea">Şirketin Çalışma Alanı</label>
                            <input className="company-create-input" type="text" id="workingArea" />
                            {errors.workingArea && <span className="error">{errors.workingArea}</span>}

                            <label className="company-create-label" htmlFor="employeeCode">Şirket Çalışan Kodu</label>
                            <input className="company-create-input" placeholder="Kodunuzu Kopyalayın" type="text" id="employeeCode" readOnly />
                            <button type="button" className="employee-code-create-btn" onClick={employeeCodeCreator}>Kod Oluştur</button>
                        </div>

                        <div className="admin-create-div">
                            <h3 className="admin-create-subheader">Admin Bilgileri</h3>
                            <label className="admin-create-label" htmlFor="adminName">Admin İsmi</label>
                            <input className="admin-create-input" type="text" id="adminName" />
                            {errors.adminName && <span className="error">{errors.adminName}</span>}

                            <label className="admin-create-label" htmlFor="adminSurname">Admin Soyismi</label>
                            <input className="admin-create-input" type="text" id="adminSurname" />
                            {errors.adminSurname && <span className="error">{errors.adminSurname}</span>}

                            <label className="admin-create-label" htmlFor="adminEmail">Admin Email</label>
                            <input className="admin-create-input" type="email" id="adminEmail" />

                            <label className="admin-create-label" htmlFor="adminPassword">Admin Şifresi</label>
                            <input className="admin-create-input" type="password" id="adminPassword" />
                            {errors.adminPassword && <span className="error">{errors.adminPassword}</span>}

                            <label className="admin-create-label" htmlFor="adminPasswordAgain">Admin Şifresi Tekrar</label>
                            <input className="admin-create-input" type="password" id="adminPasswordAgain" />
                            {errors.adminPasswordAgain && <span className="error">{errors.adminPasswordAgain}</span>}
                        </div>
                    </div>
                    <button type="submit" className="company-admin-create-button">Oluştur</button>
                </form>
            </div>
        </main>
    );
};

export default CompanyCreatePage;
