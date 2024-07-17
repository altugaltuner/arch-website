import React, { useEffect, useState } from 'react';

const MaterialUseList = ({ selectedDate }) => {
    const [materialUse, setMaterialUse] = useState([]);

    useEffect(() => {
        if (selectedDate) {
            // Veriyi fetch etmek için API çağrısı yapılabilir
            // Örnek veri olarak aşağıdaki gibi
            const fetchedData = [
                { date: 17, material: 'Demir', amount: '10 ton' },
                { date: 17, material: 'Beton', amount: '20 m3' },
                { date: 18, material: 'Çimento', amount: '5 torba' },
            ];

            const dataForSelectedDate = fetchedData.filter(item => item.date === selectedDate);
            setMaterialUse(dataForSelectedDate);
        }
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
