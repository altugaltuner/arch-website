import "./Navigation.scss";
import { Link } from 'react-router-dom';
import archLogo from "../../assets/icons/arch-web-logo.png";

function Navigation() {

    return (
        <main className="navigation-main">
            <ul className="nav-ul">
                <img src={archLogo} alt="arch-logo" />
                <li className="nav-li-third"><Link className="nav-button" to="/">Anasayfa</Link></li>
                <li className="nav-li-third"><Link className="nav-button" to="/projects">Projeler</Link></li>
                <li className="nav-li-third"><Link className="nav-button" to="/groups">Gruplar</Link></li>
                <li className="nav-li-third"><Link className="nav-button" to="/workers">Çalışanlar</Link></li>
                <li className="nav-li-one"><Link className="nav-button" to="/me">Ben</Link></li>
            </ul>
        </main>
    );
}
export default Navigation;