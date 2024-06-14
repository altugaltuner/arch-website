import "./Navigation.scss";
import { Link } from 'react-router-dom';
import archLogo from "../../assets/icons/arch-web-logo.png";
import employeesLogo from "../../assets/icons/employees-logo.png";
import groupsLogo from "../../assets/icons/groups-logo.png";
import projectsLogo from "../../assets/icons/projects-logo.png";
import myLogo from "../../assets/icons/my-profile-logo.png";
import homepageLogo from "../../assets/icons/homepage-logo.png";


function Navigation() {

    return (
        <main className="navigation-main">
            <ul className="nav-ul">
                <img src={archLogo} className="arch-logo" alt="arch-logo" />
                <li className="nav-li-third"><Link className="nav-button" to="/">
                    <img className="nav-logo" src={homepageLogo} alt="" srcSet="" />
                    Anasayfa</Link></li>
                <li className="nav-li-third"><Link className="nav-button" to="/projects">
                    <img className="nav-logo" src={projectsLogo} alt="" srcSet="" />
                    Projeler</Link></li>
                <li className="nav-li-third"><Link className="nav-button" to="/groups">
                    <img className="nav-logo" src={groupsLogo} alt="" srcSet="" />
                    Gruplar</Link></li>
                <li className="nav-li-third"><Link className="nav-button" to="/workers">
                    <img className="nav-logo" src={employeesLogo} alt="" srcSet="" />
                    Şirket Çalışanları</Link></li>
                <li className="nav-li-one"><Link className="nav-button" to="/me">
                    <img className="nav-logo" src={myLogo} alt="" srcSet="" />
                    Profilim</Link></li>
            </ul>
        </main>
    );
}
export default Navigation;