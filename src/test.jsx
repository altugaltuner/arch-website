{
    filteredGroups.map((group) => (
        <div key={group.id} className="project-group" onClick={setSelectedGroupId}>
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
    ))
}
</div >
    <GroupMessagePanel selectedGroupId={selectedGroupId} />