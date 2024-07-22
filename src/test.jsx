import { useState, useEffect, useMemo } from "react";
import "./Activities.scss";
import axios from "axios";
import { useAuth } from "../../components/AuthProvider";

const Activities = ({ searchTerm }) => {
    const [activities, setActivities] = useState([]);
    const [page, setPage] = useState(1); // Current page number
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const { user } = useAuth();
    const usersCompanyId = user?.company?.id;

    const fetchData = async (page) => {
        try {
            const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/project-revises?populate=*&pagination[page]=${page}&pagination[pageSize]=10`);
            setActivities(response.data.data);
            setTotalPages(response.data.meta.pagination.pageCount); // Update total pages
        } catch (error) {
            console.error('Error fetching the data', error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    const filteredActivities = activities.filter(activity =>
        activity.attributes.company?.data?.id === usersCompanyId &&
        (!searchTerm || activity.attributes.project?.data?.attributes?.projectName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const loadNextPage = () => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const loadPreviousPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

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
                <div className="pagination-controls">
                    <button onClick={loadPreviousPage} disabled={page === 1} className="pagination-button">
                        Önceki
                    </button>
                    <span>Sayfa {page} / {totalPages}</span>
                    <button onClick={loadNextPage} disabled={page === totalPages} className="pagination-button">
                        Sonraki
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Activities;
