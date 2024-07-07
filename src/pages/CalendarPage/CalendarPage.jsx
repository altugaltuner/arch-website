import React, { useState } from "react";
import "./CalendarPage.scss";
import Navigation from "../../components/Navigation/Navigation";

function CompanyCreatePage() {

    return (
        <main className="calendar-page-main">
            <Navigation />
            <div className="calendar-page-inner">
                <div className="calendar-page-header-and-input">
                    <h1 className="calendar-page-header">Takvim</h1>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Grup Ara"
                        value=""

                    />
                </div>
                <div className="calendar-page-inner-2">
                    <div className="calendar-area"></div>
                    <div className="calendar-area-event"></div>
                </div>
                <p className="calendar-p">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere mollitia distinctio pariatur praesentium autem error est culpa soluta quis eius beatae repudiandae commodi explicabo doloribus qui, necessitatibus illum nam numquam.</p>
            </div>
        </main>
    );
};

export default CompanyCreatePage;
