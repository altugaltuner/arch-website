import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./CompanyFormElements.scss";

const CompanyFormElements = ({ errors, setErrors }) => {
    const [employeeCodeGenerated, setEmployeeCodeGenerated] = useState(false);
    const [companyPermissionCodes, setCompanyPermissionCodes] = useState([]);
    const [allEmails, setAllEmails] = useState([]);

    const fetchEmails = async () => {
        try {
            const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/users');
            const data = response.data.map(item => item.email);
            console.log(data, "Fetched Emails");
            setAllEmails(data);
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    };

    useEffect(() => {
        fetchEmails();
    }, []);

    const employeeCodeCreator = () => {
        if (!employeeCodeGenerated) {
            const employeeCode = Math.random().toString(36).substring(2, 8).toUpperCase();
            document.getElementById("employeeCode").value = employeeCode;
            setEmployeeCodeGenerated(true);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/company-perm-codes?populate=*');
            const data = response.data.data.map(item => item.attributes.code);
            setCompanyPermissionCodes(data);
            console.log(data, "Fetched Permission Codes");
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createCompany = async (companyName, workingArea, companyCode) => {
        try {
            const response = await axios.post('https://bold-animal-facf707bd9.strapiapp.com/api/companies', {
                data: {
                    companyName: companyName,
                    workingArea: workingArea,
                    companyID: companyCode,
                },
            });
            console.log("Company created:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating company:", error);
            throw error;
        }
    };

    const createUser = async (adminName, adminSurname, adminPassword, adminEmail, company) => {
        try {
            const response = await axios.post('https://bold-animal-facf707bd9.strapiapp.com/api/users', {
                username: `${adminName} ${adminSurname}`,
                email: adminEmail,
                password: adminPassword,
                isCompanyAdmin: true,
                company: {
                    id: company.id,
                    companyName: company.companyName,
                    workingArea: company.workingArea,
                    companyID: company.companyID,
                    createdAt: company.createdAt,
                    updatedAt: company.updatedAt,
                    publishedAt: company.publishedAt
                },
                access: {
                    id: 2,
                    role: "Spectator",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    publishedAt: new Date().toISOString()
                },
                role: 1
            });
            console.log("User created:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error creating user:", error);
            if (error.response && error.response.data && error.response.data.error && error.response.data.error.message === "This attribute must be unique") {
                throw new Error("Bu e-posta adresi zaten kullanılmakta.");
            } else {
                throw error;
            }
        }
    };

    const validateInputs = async (e) => {
        e.preventDefault();

        const formElements = {
            companyPermissionCode: document.getElementById("companyPermissionCode").value,
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

        if (!companyPermissionCodes.includes(formElements.companyPermissionCode)) {
            errors.companyPermissionCode = "Geçersiz şirket oluşturma izin kodu.";
        }

        if (formElements.companyName === "" || formElements.workingArea === "" || formElements.adminName === "" || formElements.adminSurname === "" || formElements.adminEmail === "" || formElements.adminPassword === "" || formElements.adminPasswordAgain === "") {
            errors.companyName = "Lütfen tüm alanları doldurun.";
        }

        if (formElements.adminEmail !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formElements.adminEmail)) {
            errors.adminEmail = "Geçersiz email adresi.";
        }

        if (allEmails.includes(formElements.adminEmail)) {
            errors.adminEmail = "Bu e-posta adresi zaten kullanılmakta.";
        }

        if (formElements.companyName.length > 50 || formElements.companyName.length < 2) {
            errors.companyName = "Şirket ismi 50 karakterden fazla ve 2 karakterden az olamaz.";
        }

        if (formElements.workingArea.length > 30 || formElements.workingArea.length < 2) {
            errors.workingArea = "Şirketin çalışma alanı 30 karakterden fazla ve 2 karakterden az olamaz.";
        }

        if (formElements.adminName.length > 15 || !/^[a-zA-Z]+$/.test(formElements.adminName)) {
            errors.adminName = "Admin ismi 15 karakterden fazla olamaz ve sadece harf içermelidir.";
        }

        if (formElements.adminSurname.length > 20 || !/^[a-zA-ZığüşöçİĞÜŞÖÇ]+$/.test(formElements.adminSurname)) {
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
                const company = await createCompany(formElements.companyName, formElements.workingArea, formElements.companyCode);
                console.log("Company data:", company.data);

                await createUser(formElements.adminName, formElements.adminSurname, formElements.adminPassword, formElements.adminEmail, company.data);

                alert("Form başarıyla gönderildi!");
            } catch (error) {
                console.error("Form gönderimi sırasında bir hata oluştu:", error);
                alert(error.message || "Form gönderimi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            }
        }
    };

    return (
        <form className="company-admin-create-form" onSubmit={validateInputs}>
            <div className="company-admin-row-for-btn">
                <div className="company-create-div">
                    <h3 className="company-create-subheader">Şirket Bilgileri</h3>
                    <label className="company-create-label" htmlFor="companyPermissionCode">Şirket Oluşturma İzin Kodu</label>
                    <p className="free-account-p">Ücretsiz Hesap için "1010" yazın.</p>
                    <input className="company-create-input" type="text" id="companyPermissionCode" />
                    {errors.companyPermissionCode && <span className="error-for-company-signup">{errors.companyPermissionCode}</span>}

                    <label className="company-create-label" htmlFor="companyName">Şirket İsmi</label>
                    <input className="company-create-input" type="text" id="companyName" />
                    {errors.companyName && <span className="error-for-company-signup">{errors.companyName}</span>}

                    <label className="company-create-label" htmlFor="workingArea">Şirketin Çalışma Alanı</label>
                    <input className="company-create-input" type="text" id="workingArea" />
                    {errors.workingArea && <span className="error-for-company-signup">{errors.workingArea}</span>}

                    <label className="company-create-label" htmlFor="employeeCode">Şirket Çalışan Kodu</label>
                    <span className="company-code-info">Şirket çalışanlarının bu kodu kullanarak şirkete katılmasını sağlayabilirsiniz.</span>
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
                    {errors.adminEmail && <span className="error-for-company-signup">{errors.adminEmail}</span>}

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
