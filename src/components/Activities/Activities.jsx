import { useState, useEffect } from "react";
import "./Activities.scss";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";

const Activities = ({ searchTerm }) => {
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);

    const { user } = useAuth();
    const usersCompanyId = user?.company?.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://bold-animal-facf707bd9.strapiapp.com/api/project-revises?populate=*');
                setActivities(response.data.data);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filterActivities = () => {
            return activities.filter(activity => activity.attributes.company?.data?.id === usersCompanyId);
        };

        setFilteredActivities(filterActivities());
    }, [searchTerm, activities, usersCompanyId]);

    const reviseStateMap = {
        1: "yapılacak",
        2: "yapılıyor",
        3: "yapıldı",
        4: "iptal edildi"
    };

    return (
        <div className="activities-container">
            <div className="activities-container-half">
                <h2 className="activities-title">Son Aktiviteler</h2>
                <table className="activities-table">
                    <thead className="table-main-head">
                        <tr className="table-header-row">
                            <th className="table-header">Proje Adı / Revizesi</th>
                            <th className="table-header">Revize Durumu</th>
                            <th className="table-header">Revize Sahibi</th>
                            <th className="table-header">Tarih</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {filteredActivities.map(activity => (
                            <tr className="table-body-row" key={activity.id}>
                                <td className="table-data">
                                    <div className="project-name">
                                        {activity.attributes.project?.data?.attributes?.projectName || 'Proje adı yok'}
                                    </div>
                                    <div className="table-data-description">
                                        {activity.attributes.comment?.length > 0 &&
                                            activity.attributes.comment[0]?.children?.length > 0 &&
                                            activity.attributes.comment[0].children[0].text
                                        }
                                    </div>
                                </td>
                                <td className="table-data">
                                    <div className="revise-owner">
                                        {reviseStateMap[activity.attributes.reviseState] || 'Durum bilgisi yok'}
                                    </div>
                                </td>
                                <td className="table-data">
                                    <div className="revise-owner">
                                        {activity.attributes.user?.data?.attributes?.username || 'Kullanıcı adı yok'}
                                    </div>
                                </td>
                                <td className="table-data table-data-fordate">
                                    <div className="table-data-date">
                                        {activity.attributes.commentDate ? new Date(activity.attributes.commentDate).toLocaleDateString() : 'Tarih yok'}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Activities;
