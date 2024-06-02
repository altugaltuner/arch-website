import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GroupsPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import GroupMessagePanel from "../../components/GroupMessagePanel/GroupMessagePanel";

function GroupsPage() {

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
        <div className="groups-main">
            <Navigation />
            <h1 className="groups-main-header">Groups</h1>
            <div className="group-div-row">
                <div className="project-groups">
                    {groups.map((group) => (
                        <div key={group.id} className="project-group">
                            <img className="group-image" src={group.attributes.groupMedia[0]} alt="group" />
                            <h2 className="relevant-project-header">{group.attributes.groupName}</h2>

                        </div>
                    ))}
                </div>
                <GroupMessagePanel />
            </div>
        </div>
    );
}
export default GroupsPage;
