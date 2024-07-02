import "./ProjectHistory.scss";

function ProjectHistory({ clickedProject, roles }) {


    console.log("projecthistory clickedproject", clickedProject);
    console.log("projecthistory roles", roles);
    return (
        <div className="project-history-main">
            <h1 className="project-history-header">Proje Tarihçesi</h1>

            <p className="history-paragraph">Altuğ Altuner Planlar Klasöründen "Zemin Planları" dosyasını indirdi. - 15.02.2024</p>
            <p className="history-paragraph">Mehmet Arslan - Pazarlama Projesinden Sunumlar Klasöründen "Q1 Strateji" dosyasını sildi. - 08.02.2024</p>
            <p className="history-paragraph">Ayşe Demir - İnsan Kaynakları Projesinden Dökümanlar Klasöründen "Eğitim Programı" dosyasına yorum yazdı. - 05.02.2024</p>
        </div>
    );
}

export default ProjectHistory;