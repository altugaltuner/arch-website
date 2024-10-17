import "./Navigation.scss";
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ofisimLogo from "../../assets/icons/ofisim-logo1.png";
import employeesLogo from "../../assets/icons/employees-logo.png";
import calendarLogo from "../../assets/icons/calendar-icon.png";
import projectsLogo from "../../assets/icons/projects-logo.png";
import myLogo from "../../assets/icons/my-profile-logo.png";
// import homepageLogo from "../../assets/icons/homepage-logo.png";
import settingsLogo from "../../assets/icons/settings-icon.png";
import adminPanelLogo from "../../assets/icons/admin-panel.png";
import { useAuth } from "../../components/AuthProvider";

function Navigation() {
    const [activeNavId, setActiveNavId] = useState(null);
    const location = useLocation();
    const { user } = useAuth();
    const userRole = user?.access?.role ?? null;

    const navItems = [
        // { id: 'home-nav-id', to: '/homepage', logo: homepageLogo, name: 'Anasayfa' },
        { id: 'projects-nav-id', to: '/projects', logo: projectsLogo, name: 'Projeler' },
        { id: 'employees-nav-id', to: '/workers', logo: employeesLogo, name: ' Ekip Üyeleri' },
        { id: 'calendar-nav-id', to: '/calendar', logo: calendarLogo, name: ' Takvim' },
        { id: 'my-profile-nav-id', to: '/me', logo: myLogo, name: 'Profilim' },
        { id: 'settings-nav-id', to: '/settings', logo: settingsLogo, name: 'Ayarlar' }
    ];

    if (userRole === "Admin") {
        navItems.push({ id: 'admin-panel-id', to: '/adminpanel', logo: adminPanelLogo, name: 'Admin Paneli' });
    }

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
            <div className="nav-ul">
                <Link to="/flow" className="nav-button" >
                    <img src={ofisimLogo} className="flow-logo" alt="ofisim" />
                </Link>
                {navItems.map(item => (
                    <Link to={item.to} key={item.id} className={`nav-button ${activeNavId === item.id ? 'active' : ''}`} id={item.id} onClick={() => handleNavClick(item.id)}>
                        <img src={item.logo} alt="" className="nav-logo" />
                        <p className="nav-p" src="li-name">{item.name}</p>
                    </Link>
                ))}
            </div>
        </nav>
    );
}

export default Navigation;
