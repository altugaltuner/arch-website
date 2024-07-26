import React, { useEffect, useState } from 'react';
import './MaterialUseList.scss';
import axios from 'axios';

const MaterialUseList = ({ selectedDate }) => {
    const [materialUse, setMaterialUse] = useState([]);

    const fetchData = async () => {
        if (selectedDate) {

            try {
                const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/materials?populate=*`);
                setMaterialUse(response.data.data);
                console.log(response.data.data, "response for materialUse");
            } catch (error) {
                console.log("hata");
            }
            console.log()
            console.log("selectedDate", selectedDate);
            const dataForSelectedDate = materialUse.filter(item => item.attributes.date === selectedDate);
            console.log("dataforselecteddate", dataForSelectedDate)
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
                <ul className='material-list-ul'>
                    {materialUse.map((item, index) => (
                        <li className='material-list-li' key={index}>{item.material}: {item.amount}</li>
                    ))}
                </ul>
            ) : (
                <p className='material-list-no-p'>Bu gün için malzeme kullanımı bulunmamaktadır.</p>
            )}
        </div>
    );
};

export default MaterialUseList;
