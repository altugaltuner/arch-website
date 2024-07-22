import React, { useEffect, useState } from 'react';
import './MaterialUseList.scss';
import axios from 'axios';

const MaterialUseList = ({ selectedDate }) => {
    const [materialUse, setMaterialUse] = useState([]);

    const fetchData = async () => {
        if (selectedDate) {
            // Veriyi fetch etmek için API çağrısı yapılabilir
            // Örnek veri olarak aşağıdaki gibi

            try {
                const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/materials?populate=*`);
                setMaterialUse(response.data.data);
                console.log(response.data.data, "alala");
            } catch (error) {
                console.log("hata");
            }
            console.log("qq", selectedDate);
            const dataForSelectedDate = materialUse.filter(item => item.date === selectedDate);
            setMaterialUse(dataForSelectedDate);
        }
    }

    useEffect(() => {
        fetchData()
    }, [selectedDate]);

    return (
        <div className="material-use-list">
            <h3 className="material-use-list-subheader">Malzeme Kullanımı</h3>
            {materialUse.length > 0 ? (
                <ul>
                    {materialUse.map((item, index) => (
                        <li key={index}>{item.material}: {item.amount}</li>
                    ))}
                </ul>
            ) : (
                <p>Bu gün için malzeme kullanımı bulunmamaktadır.</p>
            )}
        </div>
    );
};

export default MaterialUseList;
