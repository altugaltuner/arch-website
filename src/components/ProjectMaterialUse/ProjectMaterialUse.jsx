import React, { useState } from "react";
import "./ProjectMaterialUse.scss";
import MaterialCalendar from "./MaterialCalendar/MaterialCalendar";
import MaterialUseList from "./MaterialUseList/MaterialUseList";

function ProjectMaterialUse({ clickedProject }) {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="project-material-use">
            <h2 className="material-use-header">Metraj Tutanağı</h2>
            <div className="material-use-calendar">
                <MaterialCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </div>
            <div className="material-use-list-all">
                <MaterialUseList selectedDate={selectedDate} />
            </div>
        </div>
    );
};

export default ProjectMaterialUse;
