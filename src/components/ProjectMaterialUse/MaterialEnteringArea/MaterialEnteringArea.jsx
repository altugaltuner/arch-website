import React, { useEffect, useState } from "react";
import "./MaterialEnteringArea.scss";

function MaterialEnteringArea() {

    const [matQuantity, setMatQuantity] = useState();
    const [matName, setMatName] = useState("");
    const [matType, setMatType] = useState("");

    const handleSubmitMaterial = async (e) => {
        e.preventDefault();
        if (!matName || !matQuantity || !matType) {
            alert("eksik yerleri doldurun.");
            return;
        }
        try {
            console.log("tüm gönderilecek bilgiler:", matType, matQuantity, matName);
        }
        catch (error) {
            console.log(error, "hata kodu");
        }
    }

    useEffect(() => {
        console.log("matQuantity", matQuantity);
        console.log("matName", matName);
        console.log("matType", matType);
    }, [matQuantity, matName, matType])

    const selectTypeChange = (e) => {
        setMatType(e.target.value);
    }

    return (
        <div className="material-entering-area">
            <form className="entering-area-form" onSubmit={handleSubmitMaterial}>
                <div className="one-material-div">
                    <label className="material-label" htmlFor="material-name">Malzeme Adı</label>
                    <input className="material-input" type="text" id="material-name" value={matName} onChange={(e) => setMatName(e.target.value)} placeholder="malzeme adı" />
                </div>
                <div className="one-material-div">
                    <label className="material-label" htmlFor="material-quantity">Malzeme Miktarı</label>
                    <input className="material-input" type="text" id="material-quantity" value={matQuantity} placeholder="malzeme miktarı" onChange={(e) => setMatQuantity(e.target.value)} />

                    <label className="material-label" htmlFor="unit">Ölçü birimi</label>
                    <select
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
                </div>
                <div className="one-material-div">
                    <button className="add-entry-material-btn" type="submit">Gir</button>
                    <button className='new-revise-submit-cancel'>Kapat</button>
                </div>
            </form>
        </div>
    );
};

export default MaterialEnteringArea;
