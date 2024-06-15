import axios from "axios";
import { useEffect, useState } from "react";
import "./MessageGroups.scss";

function MessageGroups() {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/groups?populate=projects,groupMedia,users_permissions_users');
                setGroups(response.data.data);
            } catch (error) {
                console.error('Error fetching groups', error);
            }
        };
        fetchGroups();
    }, []);

    return (
        <div className="message-groups-main">
            <h1 className="message-groups-main-header">Proje Grupları</h1>
            {groups.map((group) => (
                <div key={group.id} className="message-project-group">
                    <img className="message-group-image" src={group.attributes.groupMedia[0]} alt="group" />
                    <h2 className="message-relevant-project-header">{group.attributes.groupName}</h2>
                </div>
            ))}
        </div>
    );
}
export default MessageGroups;
