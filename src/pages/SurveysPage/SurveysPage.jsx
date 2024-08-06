import React, { useState } from "react";
import "./SurveysPage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";

function SurveysPage() {

    return (
        <main className="surveys-page-main">
            <Navigation />
            <div className="surveys-page-column">
                <h1 className="div-big-header">Anketler</h1>
                <div className="surveys-page-content">
                    <div className="survey-one-div">
                        <div className="survey-header-div">
                            <p className="survey-creator-title">Anket Sahibi</p>
                            <div className="survey-right-header">
                                <p className="survey-category">Kategori</p>
                                <p className="survey-date">Anket Tarihi</p>
                            </div>

                        </div>
                        <h3 className="survey-question">Soru 1 e dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et </h3>
                        <div className="survey-answers">
                            <div className="survey-answer"><p className="survey-letter">A</p>Cevap 1 e dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla fac</div>
                            <div className="survey-answer"><p className="survey-letter">B</p>Cevap 2 e dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla fac</div>
                            <div className="survey-answer"><p className="survey-letter">C</p>Cevap 3 e dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla fac</div>
                            <div className="survey-answer"><p className="survey-letter">D</p>Cevap 4 e dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla fac</div>
                        </div>
                        <div className="survey-graph"></div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SurveysPage;
