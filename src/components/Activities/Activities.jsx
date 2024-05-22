import { useState, useEffect } from "react";
import "./Activities.scss";
import axios from "axios";

const Activities = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:1337/api/project-revises?populate=*');
                setActivities(response.data.data); // API'nin döndürdüğü veriyi kontrol edin ve uygun şekilde kaydedin
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="activities-container">
            <div className="activities-container-half">
                <h2 className="activities-title">Son Aktiviteler</h2>
                <table className="activities-table">
                    <thead className="table-main-head">
                        <tr className="table-header-row">
                            <th className="table-header">Proje Adı</th>
                            <th className="table-header">Revize Sahibi</th>
                            <th className="table-header">Paylaşılan Gruplar</th>
                            <th className="table-header">Tarih</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {activities.map(activity => (
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
                                        {activity.attributes.user?.data?.attributes?.username || 'Kullanıcı adı yok'}
                                    </div>
                                </td>
                                <td className="table-data">
                                    {activity.attributes.professions?.data?.map((profession, index) => (
                                        <div key={index} className="table-data-group">
                                            <span className="table-data-bullet"></span>
                                            {profession.attributes.professionName}
                                        </div>
                                    )) || 'Paylaşılan grup yok'}
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
