import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Link ve location komponentini import ettim.
import './Navbar.scss';
const logoNav = "/src/assets/Logo.png";

function Navbar() {

    const [activeNavId, setActiveNavId] = useState(null);
    const location = useLocation();  // Mevcut konumu almak için hook

    const navItems = [
        { id: 'home-nav-id', to: '/', logo: "/src/assets/Home.png" },
        { id: 'about-nav-id', to: '/dashboard', logo: "/src/assets/Discount.png" },
        { id: 'services-nav-id', to: '/settings/products', logo: "/src/assets/Graph.png" },
        { id: 'contact-nav-id-message', to: '', logo: "/src/assets/Message.png" },
        { id: 'contact-nav-id-notification', to: '', logo: "/src/assets/Notification.png" },
        { id: 'contact-nav-id-settings', to: '/signup', logo: "/src/assets/Setting.png" },
        { id: 'contact-nav-id-logout', to: '/login', logo: "/src/assets/Logout.png" },
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
        <nav className='mainnet-logo-second'>
            <li className='logo-nav'>
                <Link to="/"><img src={logoNav} alt="Site Logo" /></Link>
            </li>
            {navItems.map(item => (
                <li key={item.id} className="single-nav" id={item.id} onClick={() => handleNavClick(item.id)}>
                    <Link to={item.to} className={`parent-inner-container-for-nav ${activeNavId === item.id ? 'active' : ''}`}>
                        <div className={`inner-container-for-nav ${activeNavId === item.id ? 'active' : ''}`}>
                            <a className='a-logo-nav-photo' role="button" tabIndex="0">
                                <img src={item.logo} alt="" className='other-nav-logo' />
                            </a>
                        </div>
                    </Link>
                </li>
            ))}
        </nav>
    );
}

export default Navbar;
