import { useState } from "react";
import "./Activities.scss";

import myLastActivities from "../../database/myLastActivities";
import otherLastAct from "../../database/othersLastAct";

const Activities = () => {
    return (
        <div className="activities-container" >
            <div className="activities-container-half">
                <h2 className="activities-title">Senin Son Aktivitelerin</h2>
                <table className="activities-table">
                    <thead className="table-main-head">
                        <tr className="table-header-row">
                            <th className="table-header">Proje Adı</th>
                            <th className="table-header">Paylaşılan Gruplar</th>
                            <th className="table-header">Tarih</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {myLastActivities.map(activity => (
                            <tr className="table-body-row" key={activity.id}>
                                <td className="table-data">
                                    <div className="project-name">{activity.projectName}</div>
                                    <div className="table-data-description">{activity.description}</div>
                                </td>
                                <td className="table-data">
                                    {activity.groups.map((group, index) => (
                                        <div key={index} className="table-data-group">
                                            <span className="table-data-bullet"></span>
                                            {group}
                                        </div>
                                    ))}
                                </td>
                                <td className="table-data table-data-fordate">
                                    <div className="table-data-date">
                                        {activity.date}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="activities-container-half">
                <h2 className="activities-title">Diğer Son Aktiviteler</h2>
                <table className="activities-table">
                    <thead className="table-main-head">
                        <tr className="table-header-row">
                            <th className="table-header">Proje Adı</th>
                            <th className="table-header">Paylaşılan Gruplar</th>
                            <th className="table-header">Tarih</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {otherLastAct.map(activity => (
                            <tr className="table-body-row" key={activity.id}>
                                <td className="table-data">
                                    <div className="project-name">{activity.projectName}</div>
                                    <div className="table-data-description">{activity.description}</div>
                                </td>
                                <td className="table-data">
                                    {activity.groups.map((group, index) => (
                                        <div key={index} className="table-data-group">
                                            <span className="table-data-bullet"></span>
                                            {group}
                                        </div>
                                    ))}
                                </td>
                                <td className="table-data table-data-fordate">
                                    <div className="table-data-date">
                                        {activity.date}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default Activities;