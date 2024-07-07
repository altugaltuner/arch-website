import "./Navigation.scss";
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import flowLogo from "../../assets/icons/flow-logo.png";
import employeesLogo from "../../assets/icons/employees-logo.png";
import calendarLogo from "../../assets/icons/calendar-icon.jpg";
import groupsLogo from "../../assets/icons/groups-logo.png";
import projectsLogo from "../../assets/icons/projects-logo.png";
import myLogo from "../../assets/icons/my-profile-logo.png";
import homepageLogo from "../../assets/icons/homepage-logo.png";
import settingsLogo from "../../assets/icons/settings-icon.png";
import adminPanelLogo from "../../assets/icons/admin-panel.png";

function Navigation() {

    const [activeNavId, setActiveNavId] = useState(null);
    const location = useLocation();  // Mevcut konumu almak için 

    const navItems = [
        { id: 'home-nav-id', to: '/homepage', logo: homepageLogo, name: 'Anasayfa' },
        { id: 'projects-nav-id', to: '/projects', logo: projectsLogo, name: 'Projeler' },
        { id: 'groups-nav-id', to: '/groups', logo: groupsLogo, name: 'Gruplar' },
        { id: 'employees-nav-id', to: '/workers', logo: employeesLogo, name: ' Ekip Üyeleri' },
        { id: 'calendar-nav-id', to: '/calendar', logo: calendarLogo, name: ' Takvim' },
        { id: 'my-profile-nav-id', to: '/me', logo: myLogo, name: 'Profilim' },
        { id: 'admin-panel-id', to: '/adminpanel', logo: adminPanelLogo, name: 'Admin Paneli' },
        { id: 'settings-nav-id', to: '/settings', logo: settingsLogo, name: 'Ayarlar' }
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
                <Link to="/flow" className="nav-button" >
                    <img src={flowLogo} className="flow-logo" alt="flow-logo" />
                </Link>
                {navItems.map(item => (
                    <li key={item.id} className="nav-li" id={item.id} onClick={() => handleNavClick(item.id)}>
                        <Link to={item.to} className={`nav-button ${activeNavId === item.id ? 'active' : ''}`}>
                            <img src={item.logo} alt="" className="nav-logo" />
                            <p className="nav-p" src="li-name">{item.name}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
export default Navigation;
