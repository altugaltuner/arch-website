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
    const [showModal, setShowModal] = useState(false);
    const [newGroup, setNewGroup] = useState({
        groupName: ""
    });

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
            } catch (error) {
                console.error('Error fetching groups', error);
            }
        };
        fetchGroups();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGroup({ ...newGroup, [name]: value });
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({ groupName: newGroup.groupName }));

        try {
            await axios.post('http://localhost:1337/api/groups', formData);
            setShowModal(false);
            setNewGroup({ groupName: "" });
            // Refetch groups after adding a new one
            const response = await axios.get('http://localhost:1337/api/groups?populate=projects,groupMedia,users_permissions_users,groupChatPic');
            setGroups(response.data.data);
        } catch (error) {
            console.error('Error creating a new group', error);
        }
    };

    return (
        <div className="groups-main">
            <Navigation />
            <h1 className="groups-main-header">Groups</h1>
            <div className="group-div-row">
                <div className="project-groups">
                    {roles.map(role => role.attributes.role === "Admin" && (
                        <button
                            className="project-group-add-group"
                            onClick={() => setShowModal(true)}
                        >
                            Grup Oluştur
                        </button>
                    ))}

                    {groups.map((group) => (
                        <div key={group.id} className="project-group">
                            {group.attributes.groupChatPic?.data ? (
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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Yeni Grup Oluştur</h2>
                        <input
                            type="text"
                            name="groupName"
                            placeholder="Grup Adı"
                            value={newGroup.groupName}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleSubmit}>Oluştur</button>
                        <button onClick={() => setShowModal(false)}>İptal</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupsPage;
