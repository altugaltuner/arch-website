import "./Navigation.scss";
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import flowLogo from "../../assets/icons/flow-logo.png";
import employeesLogo from "../../assets/icons/employees-logo.png";
import groupsLogo from "../../assets/icons/groups-logo.png";
import projectsLogo from "../../assets/icons/projects-logo.png";
import myLogo from "../../assets/icons/my-profile-logo.png";
import homepageLogo from "../../assets/icons/homepage-logo.png";
import settingsLogo from "../../assets/icons/settings-icon.png";

function Navigation() {

    const [activeNavId, setActiveNavId] = useState(null);
    const location = useLocation();  // Mevcut konumu almak için 

    const navItems = [
        { id: 'home-nav-id', to: '/', logo: homepageLogo, name: 'Anasayfa' },
        { id: 'projects-nav-id', to: '/projects', logo: projectsLogo, name: 'Projeler' },
        { id: 'groups-nav-id', to: '/groups', logo: groupsLogo, name: 'Gruplar' },
        { id: 'employees-nav-id', to: '/workers', logo: employeesLogo, name: 'Şirket Çalışanları' },
        { id: 'my-profile-nav-id', to: '/me', logo: myLogo, name: 'Profilim' },
        { id: 'settings-nav-id', to: '/settings', logo: settingsLogo, name: 'Ayarlar' },
    ];

    // Konum değiştiğinde aktif sınıfı güncelle
    useEffect(() => {
        const activeItem = navItems.find(item => item.to === location.pathname);
        if (activeItem) {
            setActiveNavId(activeItem.id);
        }
    }, [location, navItems]);

    const handleNavClick = (id) => {
        setActiveNavId(id);
    };

    return (
        <nav className="navigation-main">
            <ul className="nav-ul">
                <img src={flowLogo} className="flow-logo" alt="flow-logo" />
                {navItems.map(item => (
                    <li key={item.id} className="nav-li" id={item.id} onClick={() => handleNavClick(item.id)}>
                        <Link to={item.to} className={`nav-button ${activeNavId === item.id ? 'active' : ''}`}>
                            <img src={item.logo} alt="" className="nav-logo" />
                            <p src="li-name">{item.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
export default Navigation;
