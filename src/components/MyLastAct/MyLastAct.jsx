import React from "react";
import "./MyLastAct.scss";

function MyLastAct() {

    return (
        <div className="mylast-act-main">
            <h2 className="mylast-act-header">Son Aktivitelerim</h2>
            {/* {myLastActivities.map((activity, index) => (
                <div className="my-last-activity" key={index}>
                    <h3 className="last-activity-header">{activity.projectName}</h3>
                    <p className="last-act-p">{activity.description}</p>
                    <p className="last-act-p">{activity.date}</p>
                </div>
            ))} */}
        </div>
    );
};

export default MyLastAct;
