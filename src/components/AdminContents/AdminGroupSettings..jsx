import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminGroupSettings.scss";
import { useAuth } from "../../components/AuthProvider";

function AdminGroupSettings() {
    const [groups, setGroups] = useState([]);
    const { user } = useAuth();

    const currentUserCompanyId = user?.company?.id;

    useEffect(() => {

        axios
            .get("https://wonderful-pleasure-64045d06ec.strapiapp.com/api/groups/?populate=company")
            .then((response) => {
                const allGroups = response.data.data;

                const userGroups = allGroups.filter(group =>
                    group.attributes.company.data && group.attributes.company.data.id === currentUserCompanyId
                );
                setGroups(userGroups);
            })
            .catch(() => {
            });
    }, [currentUserCompanyId]);

    return (
        <div className="admin-group-settings">
            <h1 className="admin-group-header">Grup Kodları</h1>
            <div className="admin-group-codes-div">
                {groups.map((group) => (
                    <div key={group.id} className="admin-group-code">
                        <p className="admin-group-code-name">{group.attributes.groupName}</p>
                        <p className="admin-group-code-value">{group.attributes.groupPassword || "Şifre yok"}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminGroupSettings;
