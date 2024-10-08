import React, { useEffect, useState } from "react";
import "./MaterialEnteringArea.scss";

function MaterialEnteringArea({ selectedDate, selectedProject }) {
    const [matQuantity, setMatQuantity] = useState();
    const [matName, setMatName] = useState("");
    const [matType, setMatType] = useState("");
    const [matInputOutput, setMatInputOutput] = useState("");
    const [errorParagraph, setErrorParagraph] = useState("");

    const handleSubmitMaterial = async (e) => {
        e.preventDefault();
        if (!matName || !matQuantity || !matType || !matInputOutput) {
            setErrorParagraph("Lütfen tüm alanları doldurun.");
            return;
        }
        try {
            const data = {
                data: {
                    name: matName,
                    amount: matQuantity,
                    type: matType,
                    input: matInputOutput,
                    project: selectedProject.id,
                    date: selectedDate
                }
            };
        }
        catch (error) {
        }
    }

    const selectTypeChange = (e) => {
        setMatType(e.target.value);
        setErrorParagraph("");
    }

    const SelectTypeInput = (e) => {
        setMatInputOutput(e.target.value);
        setErrorParagraph("");
    }

    const filterMatQuantity = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setMatQuantity(e.target.value);
            setErrorParagraph("");
        }
    };

    const filterMatName = (e) => {
        setMatName(e.target.value);
        setErrorParagraph("");
    }

    const eraseAll = () => {
        setMatName("");
        setMatQuantity("");
        setMatType("");
        setErrorParagraph("");
        setMatInputOutput("");
    }

    return (
        <div className="material-entering-area">
            <h3 className="div-header">Malzeme Girişi</h3>
            <form className="entering-area-form" onSubmit={handleSubmitMaterial}>
                <div className="one-material-div">
                    <label className="material-label" htmlFor="material-name">Malzeme Adı</label>
                    <input className="material-input" type="text" id="material-name" value={matName} onChange={filterMatName} placeholder="" />
                </div>
                <div className="one-material-div">
                    <label className="material-label" htmlFor="material-quantity">Malzeme Miktarı</label>
                    <input className="material-input" type="text" id="material-quantity" value={matQuantity} placeholder="" onChange={filterMatQuantity} />

                    <label className="material-label" htmlFor="unit">Ölçü birimi</label>
                    <select
                        className="material-input-select"
                        name="unit"
                        id="unit"
                        onChange={selectTypeChange}
                    >
                        <option value="">birim seçin</option>
                        <option value="kg">kg</option>
                        <option value="metre">metre</option>
                        <option value="m2">m2</option>
                        <option value="m3">m3</option>
                        <option value="adet">adet</option>
                        <option value="dakika">dakika</option>
                    </select>
                    <label className="material-label-input-output" htmlFor="input-output">Eylem</label>
                    <select className="material-input-select" name="input-output" id="input-output" onChange={SelectTypeInput}>
                        <option value="">Eylem Seçin</option>
                        <option value="input">Girdi</option>
                        <option value="output">Çıktı</option>
                    </select>
                </div>
                <div className="one-material-div">
                    <button className="add-entry-material-btn" type="submit">Gir</button>
                    <button className='new-revise-submit-cancel' onClick={eraseAll} type="button">Temizle</button>
                    <p className="error-paragraph">{errorParagraph}</p>
                </div>
            </form>
        </div>
    );
}

export default MaterialEnteringArea;
