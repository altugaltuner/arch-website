import React from 'react';
import Switch from 'react-switch';
import { useDarkMode } from "../../DarkModeContext/DarkModeContext ";

const AppSettings = () => {
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <div className="personal-info-subsetting-column">
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Tema seçimi</h3>
                <Switch
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                />
            </div>
            <div className="personal-info-subsetting-oneline">
                <h3 className="subsetting-header">Uygulama güncellemeleri</h3>
                <p className="subsetting-paragraph">Yes/No</p>
            </div>
        </div>
    );
};

export default AppSettings;
