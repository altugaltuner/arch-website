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
            const data = {
                data: {
                    name: matName,
                    amount: matQuantity,
                    type: matType,

                    date: new Date().toISOString().split('T')[0] // assuming you want to set the current date
                }
            };

            const response = await fetch('https://bold-animal-facf707bd9.strapiapp.com/api/materials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("result", result);
            console.log("tüm gönderilen bilgiler:", matType, matQuantity, matName);
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

    const filterMatQuantity = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setMatQuantity(e.target.value);
        }
    };

    const eraseAll = () => {
        setMatName("");
        setMatQuantity("");
        setMatType("");
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
                    <input className="material-input" type="text" id="material-quantity" value={matQuantity} placeholder="malzeme miktarı" onChange={filterMatQuantity} />

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
                </div>
                <div className="one-material-div">
                    <button className="add-entry-material-btn" type="submit">Gir</button>
                    <button className='new-revise-submit-cancel' onClick={eraseAll} type="button">Temizle</button>
                </div>
            </form>
        </div>
    );
};

export default MaterialEnteringArea;
