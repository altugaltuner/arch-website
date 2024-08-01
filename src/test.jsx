{
    filteredGroups.length > 0 ? (
        filteredGroups.map((group) => {
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
                            setPassword("");
                            setErrorMessage("");
                            setShowPasswordModal(true);
                        }
                    }}
                >
                    {group.attributes.groupChatPic?.data ? (
                        <img
                            className="group-image"
                            src={group.attributes.groupChatPic.data.attributes.url}
                            alt="group-chat-pic"
                        />
                    ) : (
                        <img
                            className="group-image"
                            src={groupLogo}
                            alt="group-chat-pic"
                        />
                    )}
                    <h2 className="relevant-project-header">{group.attributes.groupName}</h2>

                    {userRole === "Admin" && (
                        <>
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
                        </>
                    )}
                </div>
            );
        })
    ) : (
    <p>Henüz Grup Bulunmamaktadır</p>
)
}
