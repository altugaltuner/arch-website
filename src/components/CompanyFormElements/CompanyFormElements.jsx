import React, { useState } from "react";
import axios from 'axios';
import "./CompanyFormElements.scss";

const CompanyFormElements = ({ errors, setErrors }) => {
    const [employeeCodeGenerated, setEmployeeCodeGenerated] = useState(false);

    const employeeCodeCreator = () => {
        if (!employeeCodeGenerated) {
            const employeeCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            document.getElementById("employeeCode").value = employeeCode;

            setEmployeeCodeGenerated(true);
        }
    };

    const createCompany = async (companyName, workingArea, companyCode) => {
        try {
            const response = await axios.post('http://localhost:1337/api/companies', {
                data: {
                    companyName: companyName,
                    workingArea: workingArea,
                    companyID: companyCode,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error creating company:", error);
            throw error;
        }
    };

    const createUser = async (adminName, adminSurname, adminPassword, adminEmail, companyID) => {
        try {
            const response = await axios.post('http://localhost:1337/api/users', {
                username: `${adminName} ${adminSurname}`,
                email: adminEmail,
                password: adminPassword,
                isCompanyAdmin: true,
                company: companyID,
                role: 3, // Admin rol ID'si
            });
            return response.data;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    };

    const validateInputs = async (e) => {
        e.preventDefault();

        const formElements = {
            companyName: document.getElementById("companyName").value,
            workingArea: document.getElementById("workingArea").value,
            companyCode: document.getElementById("employeeCode").value,
            adminName: document.getElementById("adminName").value,
            adminSurname: document.getElementById("adminSurname").value,
            adminEmail: document.getElementById("adminEmail").value,
            adminPassword: document.getElementById("adminPassword").value,
            adminPasswordAgain: document.getElementById("adminPasswordAgain").value,
        };

        let errors = {};

        if (formElements.companyName.length > 50 || formElements.companyName.length < 2) {
            errors.companyName = "Şirket ismi 50 karakterden fazla ve 2 karakterden az olamaz.";
        }
        if (formElements.workingArea.length > 30 || formElements.workingArea.length < 2) {
            errors.workingArea = "Şirketin çalışma alanı 30 karakterden fazla ve 2 karakterden az olamaz.";
        }
        if (formElements.adminName.length > 15 || !/^[a-zA-Z]+$/.test(formElements.adminName)) {
            errors.adminName = "Admin ismi 15 karakterden fazla olamaz ve sadece harf içermelidir.";
        }
        if (formElements.adminSurname.length > 20 || !/^[a-zA-Z]+$/.test(formElements.adminSurname)) {
            errors.adminSurname = "Admin soyismi 20 karakterden fazla olamaz ve sadece harf içermelidir.";
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/.test(formElements.adminPassword)) {
            errors.adminPassword = "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermeli ve en az 8 karakter uzunluğunda olmalıdır.";
        }
        if (formElements.adminPassword !== formElements.adminPasswordAgain) {
            errors.adminPasswordAgain = "Şifreler birbiriyle uyuşmuyor.";
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                // Şirket oluştur
                const company = await createCompany(formElements.companyName, formElements.workingArea, formElements.companyCode);

                // Kullanıcı oluştur ve şirket ile ilişkilendir
                await createUser(formElements.adminName, formElements.adminSurname, formElements.adminPassword, formElements.adminEmail, company.data.id);

                alert("Form başarıyla gönderildi!");
            } catch (error) {
                alert("Form gönderimi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            }
        }
    };

    return (
        <form className="company-admin-create-form" onSubmit={validateInputs}>
            <div className="company-admin-row-for-btn">
                <div className="company-create-div">
                    <h3 className="company-create-subheader">Şirket Bilgileri</h3>
                    <label className="company-create-label" htmlFor="companyName">Şirket İsmi</label>
                    <input className="company-create-input" type="text" id="companyName" />
                    {errors.companyName && <span className="error-for-company-signup">{errors.companyName}</span>}

                    <label className="company-create-label" htmlFor="workingArea">Şirketin Çalışma Alanı</label>
                    <input className="company-create-input" type="text" id="workingArea" />
                    {errors.workingArea && <span className="error-for-company-signup">{errors.workingArea}</span>}

                    <label className="company-create-label" htmlFor="employeeCode">Şirket Çalışan Kodu</label>
                    <input className="company-create-input" placeholder="Kodunuzu Kopyalayın" type="text" id="employeeCode" readOnly />
                    <button type="button" className="employee-code-create-btn" onClick={employeeCodeCreator} disabled={employeeCodeGenerated}>Kod Oluştur</button>
                </div>

                <div className="admin-create-div">
                    <h3 className="admin-create-subheader">Admin Bilgileri</h3>
                    <label className="admin-create-label" htmlFor="adminName">Admin İsmi</label>
                    <input className="admin-create-input" type="text" id="adminName" />
                    {errors.adminName && <span className="error-for-company-signup">{errors.adminName}</span>}

                    <label className="admin-create-label" htmlFor="adminSurname">Admin Soyismi</label>
                    <input className="admin-create-input" type="text" id="adminSurname" />
                    {errors.adminSurname && <span className="error-for-company-signup">{errors.adminSurname}</span>}

                    <label className="admin-create-label" htmlFor="adminEmail">Admin Email</label>
                    <input className="admin-create-input" type="email" id="adminEmail" />

                    <label className="admin-create-label" htmlFor="adminPassword">Admin Şifresi</label>
                    <input className="admin-create-input" type="password" id="adminPassword" />
                    {errors.adminPassword && <span className="error-for-company-signup">{errors.adminPassword}</span>}

                    <label className="admin-create-label" htmlFor="adminPasswordAgain">Admin Şifresi Tekrar</label>
                    <input className="admin-create-input" type="password" id="adminPasswordAgain" />
                    {errors.adminPasswordAgain && <span className="error-for-company-signup">{errors.adminPasswordAgain}</span>}
                </div>
            </div>
            <button type="submit" className="company-admin-create-button">Oluştur</button>
        </form>
    );
};

export default CompanyFormElements;
