import React, { useState, useEffect } from "react";
import "./MyLastAct.scss";

function MyLastAct({ user }) {
    const [myLastActivities, setMyLastActivities] = useState([]);

    useEffect(() => {
        if (user) {
            const lastActivities = user.project_revises;
            const lastActivitiesSorted = lastActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
            console.log(lastActivitiesSorted);
            setMyLastActivities(lastActivitiesSorted);
        }
    }, [user]);

    return (
        <div className="mylast-act-main">
            <h2 className="mylast-act-header">Son Revizelerim</h2>
            {myLastActivities.map((activity, index) => (
                <div key={index} className="mylast-act-item">
                    <ul className="mylast-act-ul">
                        <li className="mylast-act-item-date">{activity.date}</li>
                        <li className="mylast-act-item-desc">{activity.comment[0].children[0].text}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default MyLastAct;
