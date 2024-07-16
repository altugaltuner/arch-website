import React, { useState, useEffect } from "react";
import "./MyLastAct.scss";

function MyLastAct({ user }) {
    const [myLastActivities, setMyLastActivities] = useState([]);

    useEffect(() => {
        if (user) {
            const lastActivities = user.project_revises;
            const lastActivitiesSorted = lastActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
            setMyLastActivities(lastActivitiesSorted);
        }
    }, [user]);

    return (
        <div className="mylast-act-main">
            <h2 className="mylast-act-header">Son Revizelerim</h2>
            <ul className="mylast-act-ul">
                {myLastActivities.map((activity, index) => (
                    <li className="mylast-act-item-desc">{activity.comment[0].children[0].text}
                        <p className="mylast-act-item-date">{activity.commentDate ? new Date(activity.commentDate).toLocaleDateString() : 'Tarih yok'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyLastAct;
