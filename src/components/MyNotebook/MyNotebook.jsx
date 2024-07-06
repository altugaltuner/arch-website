import React, { useState, useEffect } from "react";
import "./MyNotebook.scss";

function MyNotebook() {

    return (
        <div className="my-notebook-main">
            <h2 className="my-notebook-note-header">Not Defterim</h2>
            <button className="note-button">Yeni Not Yaz</button>
            <div className="notebook-notes-area">
                <div className="note-div">
                    <h3 className="note-one-subheader">lorem ipsum başlık</h3>
                    <p className="note-one-subnote">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum, aliquam voluptatibus. Quo officiis nam ea quae, saepe sint, reprehenderit quas vel autem nisi quia culpa necessitatibus nobis voluptatum placeat esse!</p>
                </div>
                <div className="note-div">
                    <h3 className="note-one-subheader">lorem ipsum başlık</h3>
                    <p className="note-one-subnote">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum, aliquam voluptatibus. </p>
                </div>
                <div className="note-div">
                    <h3 className="note-one-subheader">lorem ipsum başlık</h3>
                    <p className="note-one-subnote">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum, aliquam voluptatibus. Quo officiis nam ea quae, saepe sint, reprehenderit quas vel autem nisi quia culpa necessitatibus nobis voluptatum placeat esse!</p>
                </div>
            </div>
        </div>
    );
};

export default MyNotebook;
