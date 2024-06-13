import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GroupsPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import GroupMessagePanel from "../../components/GroupMessagePanel/GroupMessagePanel";

function GroupsPage() {
    const [deleteIcon, setDeleteIcon] = useState([]);
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [newGroup, setNewGroup] = useState({
        groupName: ""
    });

    async function getDeleteIcon() {
        try {
            const response = await axios.get('http://localhost:1337/api/website-uis/7?populate=*');
            console.log("Delete icon response:", response.data.data);
            setDeleteIcon(response.data.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getDeleteIcon();
    }, []);

    function handleDeleteGroup() {
        try {
            axios.delete(`http://localhost:1337/api/groups/${selectedGroupId}`).then(() => {
                setGroups((prevGroups) => prevGroups.filter((group) => group.id !== selectedGroupId));
                setShowDeleteModal(false);
                setSelectedGroupId(null);
            });
        } catch (error) {
            console.error('Error deleting the group', error);
        }
    }

    const fetchProjectGroups = async () => {
        try {
            const response = await axios.get('http://localhost:1337/api/groups?populate=projects,groupMedia,users_permissions_users,groupChatPic');
            setGroups(response.data.data);
        } catch (error) {
            console.error('Error fetching the data', error);
        }
    };

    useEffect(() => {
        fetchProjectGroups();
    }, []);

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
                            <img
                                className="file-card-delete-btn"
                                src={`http://localhost:1337${deleteIcon.attributes.LogoImg.data[0].attributes.formats.thumbnail.url}`}
                                alt=""
                                onClick={() => {
                                    setSelectedGroupId(group.id);
                                    setShowDeleteModal(true);
                                }}
                            />
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

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowDeleteModal(false)}>&times;</span>
                        <h2>Grubu Sil</h2>
                        <p>Grubu gerçekten silmek istiyor musunuz?</p>
                        <button onClick={handleDeleteGroup}>Evet</button>
                        <button onClick={() => setShowDeleteModal(false)}>Hayır</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GroupsPage;
