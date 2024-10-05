import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./CompanyFormElements.scss";

const CACHE_DURATION = 15 * 60 * 1000;

const CompanyFormElements = ({ errors, setErrors }) => {
    const [employeeCodeGenerated, setEmployeeCodeGenerated] = useState(false);
    const [companyPermissionCodes, setCompanyPermissionCodes] = useState([]);
    const [allEmails, setAllEmails] = useState([]);

    const fetchEmails = async () => {
        const cachedEmails = localStorage.getItem(`emails`);
        const cachedTimestampEmails = localStorage.getItem(`emails_timestamp`);

        if (cachedEmails && cachedTimestampEmails) {
            const age = Date.now() - parseInt(cachedTimestampEmails, 10);
            if (age < CACHE_DURATION) {
                console.log('Veriler localStorage\'dan yükleniyor');
                setAllEmails(JSON.parse(cachedEmails));
                return;
            }
        }
        try {
            const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/users');
            const data = response.data.map(item => item.email);
            setAllEmails(data);
            localStorage.setItem(`emails`, JSON.stringify(data));
            localStorage.setItem(`emails_timestamp`, Date.now().toString());

        } catch (error) {
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
        const cachedPermissionCodes = localStorage.getItem(`permission_codes`);
        const cachedTimestampPermissionCodes = localStorage.getItem(`permission_codes_timestamp`);
        if (cachedPermissionCodes && cachedTimestampPermissionCodes) {
            const age = Date.now() - parseInt(cachedTimestampPermissionCodes, 10);
            if (age < CACHE_DURATION) {
                setCompanyPermissionCodes(JSON.parse(cachedPermissionCodes));
                return;
            }
        }
        try {
            const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/company-perm-codes?populate=*');
            const data = response.data.data.map(item => item.attributes.code);
            setCompanyPermissionCodes(data);
            localStorage.setItem(`permission_codes`, JSON.stringify(data));
            localStorage.setItem(`permission_codes_timestamp`, Date.now().toString());
        } catch (error) {
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
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const createUser = async (adminName, adminSurname, adminPassword, adminEmail, company) => {
        try {
            const username = `${adminName} ${adminSurname}${Math.floor(Math.random() * 10000)}`;

            const response = await axios.post('https://bold-animal-facf707bd9.strapiapp.com/api/users', {
                username: username,
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
                    id: 1,
                    role: "Admin",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    publishedAt: new Date().toISOString()
                },
                role: 1
            });
            return response.data;
        } catch (error) {
            throw error;
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

        if (formElements.adminEmail === allEmails.find(email => email === formElements.adminEmail)) {
            errors.adminEmail = "Bu email adresi zaten kullanılmakta.";
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

                await createUser(formElements.adminName, formElements.adminSurname, formElements.adminPassword, formElements.adminEmail, company.data);

                alert("Form başarıyla gönderildi!");
            } catch (error) {
                alert("Form gönderimi sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            }
            window.location.href = "/login";
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
