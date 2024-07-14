import axios from "axios";
import { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GroupsPage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";
import GroupMessagePanel from "../../components/GroupMessagePanel/GroupMessagePanel";
import CreateGroupModal from "../../components/GroupModals/CreateGroupModal ";
import DeleteGroupModal from "../../components/GroupModals/DeleteGroupModal ";
import EditGroupModal from "../../components/EditGroupModal/EditGroupModal";
import PasswordModal from "../../components/GroupModals/PasswordModal";

import editIcon from "../../assets/icons/edit-pencil.png";
import deleteIcon from "../../assets/icons/delete-icon.png";
import groupLogo from "../../assets/icons/GroupProfileLogo.png";

function GroupsPage() {
    const [roles, setRoles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [groups, setGroups] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(1);
    const [newGroup, setNewGroup] = useState({ groupName: "", groupPassword: "" });
    const [changedGroup, setChangedGroup] = useState({ groupName: "" });
    const [searchTerm, setSearchTerm] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [verifiedGroups, setVerifiedGroups] = useState([]);

    const { user } = useAuth();
    const usersCompanyId = user?.company?.id;
    const userRole = user.access.role;

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
        console.log('Fetching project groups...');
        try {
            const response = await axios.get('http://localhost:1337/api/groups?populate=projects,groupMedia,users_permissions_users,groupChatPic,company,groupPassword');
            const allGroups = response.data.data;
            const companyGroups = allGroups.filter(group => group.attributes.company?.data?.id === usersCompanyId);
            console.log('Fetched groups:', companyGroups);
            setGroups(companyGroups);
            setFilteredGroups(companyGroups);
        } catch (error) {
            console.error('Error fetching the data', error);
        }
    };

    useEffect(() => {
        fetchProjectGroups();
    }, [usersCompanyId]);

    useEffect(() => {
        setFilteredGroups(
            groups.filter((group) =>
                group.attributes.groupName.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, groups]);

    async function getRoles() {
        console.log('Fetching roles...');
        try {
            const response = await axios.get('http://localhost:1337/api/accesses');
            console.log('Fetched roles:', response.data.data);
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
        console.log('Input changed:', name, value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log('Search term changed:', e.target.value);
    };

    const handleSubmit = async (group) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify({
            groupName: group.groupName,
            company: usersCompanyId,
            groupPassword: group.groupPassword
        }));
        console.log('Submitting new group:', group);

        try {
            await axios.post('http://localhost:1337/api/groups', formData);
            setShowModal(false);
            setNewGroup({ groupName: "", groupPassword: "" });
            console.log('Group created successfully, refetching groups...');
            const response = await axios.get('http://localhost:1337/api/groups?populate=projects,groupMedia,users_permissions_users,groupChatPic,company');
            const allGroups = response.data.data;
            const companyGroups = allGroups.filter(group => group.attributes.company?.data?.id === usersCompanyId);
            setGroups(companyGroups);
            setFilteredGroups(companyGroups);
        } catch (error) {
            console.error('Error creating a new group', error);
        }
    };

    const handleGroupClick = (groupId) => {
        console.log('Group clicked:', groupId);
        const group = groups.find(g => g.id === groupId);
        const isUserInGroup = group.attributes.users_permissions_users.data.some(u => u.id === user.id);

        if (isUserInGroup || verifiedGroups.includes(groupId)) {
            setSelectedGroupId(groupId);
            setShowPasswordModal(false);
        } else {
            setSelectedGroupId(groupId);
            setPassword(""); // Şifre alanını boşalt
            setErrorMessage(""); // Hata mesajını temizle
            setShowPasswordModal(true);
        }
    };

    const handlePasswordSubmit = async () => {
        console.log('Submitting password:', password);
        const group = groups.find(g => g.id === selectedGroupId);

        if (group) {
            console.log('Found group:', group);
            if (group.attributes.groupPassword === password) {
                console.log('Password correct, adding user to group...');
                try {
                    await axios.put(`http://localhost:1337/api/groups/${selectedGroupId}`, {
                        data: {
                            users_permissions_users: [...group.attributes.users_permissions_users.data.map(u => u.id), user.id]
                        }
                    });
                    setSelectedGroupId(selectedGroupId);
                    setVerifiedGroups([...verifiedGroups, selectedGroupId]);
                    setShowPasswordModal(false);
                    return { success: true };
                } catch (error) {
                    console.error('Error joining the group', error);
                    return { success: false, message: 'Gruba katılırken bir hata oluştu.' };
                }
            } else {
                console.log('Incorrect password.');
                setErrorMessage("Yanlış şifre.");
                return { success: false, message: 'Yanlış şifre.' };
            }
        } else {
            console.log('Group not found.');
            return { success: false, message: 'Grup bulunamadı.' };
        }
    };

    return (
        <div className="groups-main">
            <Navigation />
            <div className="groups-main-column">
                <div className="groups-main-header-and-input">
                    <h1 className="groups-main-header">Proje Grupları</h1>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Grup Ara"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        autoComplete="off" // Otomatik doldurma devre dışı bırakıldı
                    />
                </div>
                <div className="groups-x-all">
                    <div className="project-groups">
                        {userRole === "Admin" && (
                            <button
                                className="project-group-add-group"
                                onClick={() => setShowModal(true)}
                                role="button">

                                Grup Oluştur
                            </button>
                        )}
                        {filteredGroups.map((group) => {
                            const isUserInGroup = group.attributes.users_permissions_users.data.some(u => u.id === user.id);
                            return (
                                <div
                                    key={group.id}
                                    className="project-group"
                                    onClick={() => {
                                        if (isUserInGroup || verifiedGroups.includes(group.id)) {
                                            setSelectedGroupId(group.id);
                                            setShowPasswordModal(false);
                                        } else {
                                            setSelectedGroupId(group.id);
                                            setPassword(""); // Şifre alanını boşalt
                                            setErrorMessage(""); // Hata mesajını temizle
                                            setShowPasswordModal(true);
                                        }
                                    }}
                                >
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
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedGroupId(group.id);
                                            setChangedGroup({ groupName: group.attributes.groupName });
                                            setShowEditModal(true);
                                        }}
                                    />
                                    <img
                                        className="file-card-delete-btn"
                                        src={deleteIcon}
                                        alt=""
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedGroupId(group.id);
                                            setShowDeleteModal(true);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <GroupMessagePanel selectedGroupId={selectedGroupId} />
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
            <PasswordModal
                showPasswordModal={showPasswordModal}
                setShowPasswordModal={setShowPasswordModal}
                password={password}
                setPassword={setPassword}
                handlePasswordSubmit={handlePasswordSubmit}
                errorMessage={errorMessage}
            />
        </div>
    );
}

export default GroupsPage;
