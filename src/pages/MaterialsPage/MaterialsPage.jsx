import "./MaterialsPage.scss";
import { useState, useEffect } from "react";
import MaterialCalendar from "../../components/ProjectMaterialUse/MaterialCalendar/MaterialCalendar";
import MaterialEnteringArea from "../../components/ProjectMaterialUse/MaterialEnteringArea/MaterialEnteringArea";
import MaterialUseList from "../../components/ProjectMaterialUse/MaterialUseList/MaterialUseList";
import Navigation from "../../components/Navigation/Navigation";
import { useAuth } from "../../components/AuthProvider";
import axios from "axios";

const CACHE_DURATION = 15 * 60 * 1000; // 15 dakika

function MaterialsPage() {
    const { user } = useAuth();
    const usersCompanyId = user?.company?.id;
    const [companyProjects, setCompanyProjects] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [materialDates, setMaterialDates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

            const cachedProjects = localStorage.getItem(`projects_${usersCompanyId}`);
            const cachedTimestampProjects = localStorage.getItem(`projects_${usersCompanyId}_timestamp`);

            if (cachedProjects && cachedTimestampProjects) {
                const age = Date.now() - parseInt(cachedTimestampProjects, 10);
                if (age < CACHE_DURATION) {
                    console.log('Veriler localStorage\'dan yükleniyor');
                    setCompanyProjects(JSON.parse(cachedProjects));
                    return;
                }
            }

            try {
                const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/companies/${usersCompanyId}/?populate=*`);
                setCompanyProjects(response.data.data.attributes.projects.data);

                localStorage.setItem(`projects_${usersCompanyId}`, JSON.stringify(response.data.data.attributes.projects.data));
                localStorage.setItem(`projects_${usersCompanyId}_timestamp`, Date.now().toString());
                console.log('Veriler API\'den yükleniyor');
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, [usersCompanyId]);

    useEffect(() => {
        if (selectedProject) {
            // Seçilen proje için malzeme tarihlerinin getirilmesi
            const fetchMaterialDates = async () => {
                try {
                    const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/materials?filters[project]=${selectedProject.id}`);
                    const dates = response.data.data.map(material => material.attributes.date);
                    setMaterialDates(dates);
                } catch (error) {
                    console.error('Error fetching material dates', error);
                }
            };
            fetchMaterialDates();
        } else {
            setMaterialDates([]); // Proje seçilmezse malzeme tarihlerini sıfırla
        }
    }, [selectedProject]); // selectedProject bağımlılığına göre çalışır

    const selectProject = (e) => {
        const projectName = e.target.value;
        const project = companyProjects.find(p => p.attributes.projectName === projectName);
        setSelectedProject(project);
    };

    const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const formattedDate = formatDate(selectedDate);

    return (
        <div className="project-material-use">
            <Navigation />
            <div className="materials-inner-div">
                <h2 className="div-big-header">Metraj Tutanağı</h2>
                <div className="material-use-calendar">
                    <MaterialCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} materialDates={materialDates} />
                </div>
                <div className="material-choose-project">
                    <h2 className="div-header-select-project">Proje Seçin</h2>
                    <select
                        className='material-choose-project-select'
                        name="user-role"
                        id="user-role"
                        onChange={selectProject}
                    >
                        <option className='material-project-options' value="">Proje seçin</option>
                        {companyProjects.map((project) => (
                            <option className="material-project-options" key={project.id} value={project.attributes.projectName}>{project.attributes.projectName}</option>
                        ))}
                    </select>
                </div>
                <div className="material-use-list-all">
                    <MaterialUseList selectedDate={formattedDate} selectedProject={selectedProject} />
                    <MaterialEnteringArea selectedDate={formattedDate} selectedProject={selectedProject} />
                </div>
            </div>
        </div>
    );
}

export default MaterialsPage;
