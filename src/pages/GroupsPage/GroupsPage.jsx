import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./GroupsPage.scss";
import Navigation from "../../components/Navigation/Navigation";

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

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="groups-main">
            <Navigation />
            <h1 className="groups-main-header">Groups</h1>
            <div className="project-groups">
                {groups.map((group) => (
                    <div key={group.id} className="project-group">
                        <h2 className="project-group-header">{group.id}</h2>
                        <h3 className="relevant-project-header">Project: {group.attributes.groupName}</h3>
                        <div className="project-group-members">
                            <p className="project-group-member-header">Katılımcılar</p>
                            <Slider {...settings} className="project-group-list">
                                {group.attributes.users_permissions_users.data.map((user) => (
                                    <div key={user.id} className="group-list-element">{user.attributes.username}</div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default GroupsPage;
