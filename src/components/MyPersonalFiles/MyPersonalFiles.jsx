import React, { useState } from "react";
import "./MyPersonalFiles.scss";

function AboutMePage() {

    return (
        <div className="my-files-panel">
            <h2>Dosyalarım</h2>
            <div className="folders">
                <div className="folder">
                    <img src="path/to/windows-folder-logo.png" alt="folder" />
                    <p>Klasör 1</p>
                </div>
                <div className="folder">
                    <img src="path/to/windows-folder-logo.png" alt="folder" />
                    <p>Klasör 2</p>
                </div>
                <div className="folder">
                    <img src="path/to/windows-folder-logo.png" alt="folder" />
                    <p>Klasör 3</p>
                </div>
                <div className="folder">
                    <img src="path/to/windows-folder-logo.png" alt="folder" />
                    <p>Klasör 4</p>
                </div>
            </div>
        </div>
    );
};

export default AboutMePage;


