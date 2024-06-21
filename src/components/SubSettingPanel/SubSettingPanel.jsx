import "./SubSettingPanel.scss";

function SubSettingPanel({ selectedSetting }) {

    return (
        <div className="sub-setting-panel-page">
            <h2 className="sub-setting-panel-header">{selectedSetting}</h2>
            <h3 className="sub-setting-panel-content">Veri yedekleme ve geri yükleme seçenekleri</h3>
            <h3 className="sub-setting-panel-content">Depolama kullanımı ve yönetimi</h3>
            <h3 className="sub-setting-panel-content">Arşivleme seçenekleri</h3>
        </div>
    );
}

export default SubSettingPanel;

