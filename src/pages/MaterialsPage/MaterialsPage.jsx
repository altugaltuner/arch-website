import "./MaterialsPage.scss";
import { useState } from "react";
import MaterialCalendar from "../../components/ProjectMaterialUse/MaterialCalendar/MaterialCalendar";
import MaterialEnteringArea from "../../components/ProjectMaterialUse/MaterialEnteringArea/MaterialEnteringArea";
import MaterialUseList from "../../components/ProjectMaterialUse/MaterialUseList/MaterialUseList";
import Navigation from "../../components/Navigation/Navigation";

function MaterialsPage() {

    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="project-material-use">
            <Navigation />
            <div className="materials-inner-div">
                <h2 className="material-use-header">Metraj Tutanağı</h2>
                <div className="material-use-calendar">
                    <MaterialCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>
                <div className="material-use-list-all">
                    <MaterialUseList selectedDate={selectedDate} />
                    <MaterialEnteringArea />
                </div>
            </div>
        </div>
    );
}

export default MaterialsPage;