import { useNavigate } from 'react-router-dom';
import './ProjectHeader.scss';

function ProjectHeader({ onTabChange }) {
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        onTabChange(null);  // selectedItem state'ini sıfırla
        navigate(`/projects/${tab}`);
    };

    return (
        <div className="project-section-main">
            <div className="projects-page-content-header">
                <h2 className="active-project-title">Yeşil Vadi Konutları</h2>
                <div className="active-project-tabs">
                    <button className="active-project-btn" type="button" onClick={() => handleTabChange('allprojects')}>Proje Dosyaları</button>
                    <button className="active-project-btn" type="button" onClick={() => handleTabChange('team')}>Proje Ekipleri</button>
                </div>
            </div>
        </div>
    );
}

export default ProjectHeader;
