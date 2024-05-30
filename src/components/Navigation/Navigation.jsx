import { useState } from "react";
import "./Navigation.scss";
import { Link, useLocation } from 'react-router-dom';

function Navigation() {

    return (
        <main className="navigation-main">
            <ul className="nav-ul">
                <li className="nav-li-third"><Link className="nav-button" to="/">Anasayfa</Link></li>
                <li className="nav-li-third"><Link className="nav-button" to="/projects/project-files">Projeler</Link></li>
                <li className="nav-li-third"><Link className="nav-button" to="/groups">Gruplar</Link></li>
                <li className="nav-li-third"><Link className="nav-button" to="/workers">Çalışanlar</Link></li>
                <li className="nav-li-one"><Link className="nav-button" to="/me">Ben</Link></li>
            </ul>
        </main>
    );
}
export default Navigation;