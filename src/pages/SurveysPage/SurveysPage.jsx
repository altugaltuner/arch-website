import React, { useEffect, useState } from "react";
import "./SurveysPage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";
import axios from "axios";

function SurveysPage() {
    useAuth();
    const [surveys, setSurveys] = useState([]);

    const getSurveys = async () => {
        try {
            const response = await axios.get("https://wonderful-pleasure-64045d06ec.strapiapp.com/api/surveys?populate=*");
            setSurveys(response.data.data);
        }
        catch (error) {
        }
    }

    useEffect(() => {
        getSurveys();
    }, []);

    return (
        <main className="surveys-page-main">
            <Navigation />
            <div className="surveys-page-column">
                <h1 className="div-big-header">Anketler</h1>
                <div className="surveys-page-content">
                    {surveys?.length > 0 &&
                        surveys.map((survey) => (
                            <div className="survey-one-div" key={survey.id}>
                                <div className="survey-part">
                                    <div className="survey-header-div">
                                        <p className="survey-creator-title">{survey?.attributes?.users_permissions_user?.data?.attributes?.username}</p>
                                        <div className="survey-right-header">
                                            <p className="survey-point">{survey?.attributes?.surveyPoint}</p>
                                            <p className="survey-category">{survey?.attributes?.category}</p>
                                            <p className="survey-date">{survey?.attributes?.createdDate}</p>
                                        </div>
                                    </div>
                                    <h3 className="survey-question">{survey?.attributes?.question}</h3>
                                    {survey?.attributes?.answers?.answers?.map((answer, index) => (
                                        <div className="survey-answers" key={index}>
                                            <p className="survey-answer">{answer?.text}</p>
                                            <p className="survey-answer-count">{answer?.votes}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="survey-graph">
                                    <h1 className="div-header">Yorumlar</h1>
                                    {survey?.attributes?.comment?.comments?.map((comment, index) => (
                                        <div className="survey-comment" key={index}>
                                            <p className="survey-comment-username">{comment?.owner}</p>
                                            <p className="survey-comment-text">{comment?.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    {surveys.length === 0 && <p>Henüz anket bulunmamaktadır.</p>}
                </div>
            </div>
        </main>
    );
}

export default SurveysPage;