import './ProjectHeader.scss';
import { useNavigate } from 'react-router-dom';
import backButton from '../../assets/icons/back-button.png';

function ProjectHeader({ clickedProject }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/projects'); // Projeler sayfasına geri yönlendir
    };

    return (
        <div className="project-section-main">
            <div className="projects-page-content-header">
                <div className="header-with-back-button">
                    <button className="back-button" onClick={handleBackClick}><img className='back-btn' src={backButton} alt="" srcSet="" /></button>
                    <h2 className="active-project-title">{clickedProject ? clickedProject.attributes.projectName : "Seçili Proje Yok"}</h2>
                </div>
                <div className="active-project-tabs">
                    <p className="active-project-btn" type="button" >Proje Dosyaları</p>
                    <p className="active-project-btn" type="button">Proje Ekipleri</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectHeader;
