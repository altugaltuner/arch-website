import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GroupsPage.scss";
import Navigation from "../../components/Navigation/Navigation";
import GroupMessagePanel from "../../components/GroupMessagePanel/GroupMessagePanel";
import CreateGroupModal from "../../components/GroupModals/CreateGroupModal";
import DeleteGroupModal from "../../components/GroupModals/DeleteGroupModal";
import EditGroupModal from "../../components/EditGroupModal/EditGroupModal";

import editIcon from "../../assets/icons/edit-pencil.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import groupLogo from "../../assets/icons/GroupProfileLogo.png";

function GroupsPage() {
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [groups, setGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [newGroup, setNewGroup] = useState({ groupName: "" });
    const [changedGroup, setChangedGroup] = useState({ groupName: "" });

    const handleDeleteGroup = () => {
        try {
            axios.delete(`http://localhost:1337/api/groups/${selectedGroupId}`).then(() => {
                setGroups((prevGroups) => prevGroups.filter((group) => group.id !== selectedGroupId));
                setShowDeleteModal(false);
                setSelectedGroupId(null);
            });
        } catch (error) {
            console.error('Error deleting the group', error);
        }
    };

    const handleEditGroup = (newGroupName) => {
        const payload = {
            data: {
                groupName: newGroupName
            }
        };

        try {
            axios.put(`http://localhost:1337/api/groups/${selectedGroupId}`, payload).then(() => {
                setShowEditModal(false);
                setSelectedGroupId(null);
                fetchProjectGroups();
            });
        } catch (error) {
            console.error('Error editing the group', error);
        }
    };

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
            <div className="groups-main-column">
                <h1 className="groups-main-header">Proje Grupları</h1>
                <div className="group-div-row">
                    <div className="project-groups">
                        {roles.map(role => role.attributes.role === "Admin" && (
                            <button
                                className="project-group-add-group"
                                onClick={() => setShowModal(true)}
                                role="button"
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
                                        src={groupLogo}
                                        alt="group-chat-pic"
                                    />
                                )}
                                <h2 className="relevant-project-header">{group.attributes.groupName}</h2>
                                <img className="file-card-edit-btn"
                                    src={editIcon}
                                    alt=""
                                    onClick={() => {
                                        setSelectedGroupId(group.id);
                                        setChangedGroup({ groupName: group.attributes.groupName });
                                        setShowEditModal(true);
                                    }}
                                />
                                <img
                                    className="file-card-delete-btn"
                                    src={deleteIcon}
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
            </div>
            <CreateGroupModal
                showModal={showModal}
                setShowModal={setShowModal}
                newGroup={newGroup}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />

            <DeleteGroupModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleDeleteGroup={handleDeleteGroup}
            />
            <EditGroupModal
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                handleEditGroup={handleEditGroup}
            />
        </div>
    );
}

export default GroupsPage;
