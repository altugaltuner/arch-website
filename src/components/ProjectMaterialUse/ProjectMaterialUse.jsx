import React, { useEffect, useState } from "react";
import "./ProjectMaterialUse.scss";
import MaterialCalendar from "./MaterialCalendar/MaterialCalendar";
import MaterialUseList from "./MaterialUseList/MaterialUseList";
import MaterialEnteringArea from "./MaterialEnteringArea/MaterialEnteringArea";

function ProjectMaterialUse({ clickedProject }) {
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        console.log(clickedProject);
    }, [])

    return (
        <div className="project-material-use">
            <h2 className="material-use-header">Metraj Tutanağı</h2>
            <div className="material-use-calendar">
                <MaterialCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <div className="material-use-list-all">
                <MaterialUseList selectedDate={selectedDate} />
                <MaterialEnteringArea />
            </div>
        </div>
    );
};

export default ProjectMaterialUse;
