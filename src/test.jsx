useEffect(() => {
    const fetchGroupDetails = async () => {
        if (selectedGroupId) {
            try {
                const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/groups/${selectedGroupId}?populate=users_permissions_users.role,company`);
                const groupDetails = response.data.data;
                console.log("groupDetails", groupDetails);
                if (!groupDetails) {
                    throw new Error("Group details not found");
                }

                const companyId = groupDetails?.attributes?.company?.data?.id;

                // Check if the companyId matches userCompanyId
                if (companyId === userCompanyId) {
                    setGroupName(groupDetails?.attributes?.groupName);
                    setMessages(groupDetails?.attributes?.chatMessages || []);
                    const isUserInGroup = groupDetails?.attributes.users_permissions_users?.data.some(u => u.id === user?.id);
                    setIsUserInGroup(isUserInGroup);
                }
            } catch (error) {
                console.error("Error fetching group details:", error.response ? error.response.data : error.message);
            }
        }
    };

    fetchGroupDetails();
}, [selectedGroupId, user.id]);
