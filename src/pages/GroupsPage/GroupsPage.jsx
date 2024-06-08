import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GroupsPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import GroupMessagePanel from "../../components/GroupMessagePanel/GroupMessagePanel";

function GroupsPage() {

    const [groups, setGroups] = useState([]);
    const [roles, setRoles] = useState([]);

    async function getRoles() {
        try {
            const response = await axios.get('http://localhost:1337/api/accesses');
            setRoles(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/groups?populate=projects,groupMedia,users_permissions_users,groupChatPic');
                setGroups(response.data.data);
                console.log(response.data.data);
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

                    {roles.map(role => {
                        if (role.attributes.role === "Admin") {
                            return (
                                <button className="project-group-add-group">
                                    Grup Oluştur
                                </button>
                            )
                        }
                    })}

                    {groups.map((group) => (
                        <div key={group.id} className="project-group">
                            {group.attributes.groupChatPic.data ? (
                                <img
                                    className="group-image"
                                    src={`http://localhost:1337${group.attributes.groupChatPic.data.attributes.url}`}
                                    alt={group.attributes.groupChatPic.data.attributes.name}
                                />
                            ) : (
                                <img
                                    className="group-image"
                                    src="https://play-lh.googleusercontent.com/iBKHlB7QEv8Ez57mJhGLUJDXwxzFHioEzacOBJABT0BA6fm71SxOCvsxH0Lk4fo3AJJ1=w600-h300-pc0xffffff-pd"
                                    alt="group-chat-pic"
                                />
                            )}
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
