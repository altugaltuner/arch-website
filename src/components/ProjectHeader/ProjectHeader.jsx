import './ProjectHeader.scss';
import { useNavigate } from 'react-router-dom';
import backButton from '../../assets/icons/back-button.png';

function ProjectHeader({ clickedProject }) {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/projects');
    };

    return (
        <div className="project-section-main">
            <div className="projects-page-content-header">
                <div className="header-with-back-button">
                    <button className="back-button" onClick={handleBackClick}><img className='back-btn' src={backButton} alt="" srcSet="" /></button>
                    <h2 className="div-big-header">{clickedProject ? clickedProject.attributes.projectName : "Seçili Proje Yok"}</h2>
                </div>
                <div className="active-project-tabs">
                    <p className="div-header">Proje Dosyaları</p>
                    <p className="div-header">Proje Ekibi</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectHeader;
