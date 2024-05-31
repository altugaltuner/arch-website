import React, { useState } from "react";
import "./MyPersonalFiles.scss";

function AboutMePage() {

    return (
        <div className="my-files-panel">
            <h2 className="my-files-panel-header">Dosyalarım</h2>
            <div className="my-folders">
                <div className="my-folder">
                    <img className="my-folder-preview" src="path/to/windows-folder-logo.png" alt="folder" />
                    <p className="my-folder-name">Klasör 1</p>
                </div>
                <div className="my-folder">
                    <img className="my-folder-preview" src="path/to/windows-folder-logo.png" alt="folder" />
                    <p className="my-folder-name">Klasör 2</p>
                </div>
                <div className="my-folder">
                    <img className="my-folder-preview" src="path/to/windows-folder-logo.png" alt="folder" />
                    <p className="my-folder-name">Klasör 3</p>
                </div>
                <div className="my-folder">
                    <img className="my-folder-preview" src="path/to/windows-folder-logo.png" alt="folder" />
                    <p className="my-folder-name">Klasör 4</p>
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;


