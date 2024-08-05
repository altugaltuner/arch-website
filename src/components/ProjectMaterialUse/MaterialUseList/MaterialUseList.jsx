import React, { useEffect, useState } from 'react';
import './MaterialUseList.scss';
import axios from 'axios';

const CACHE_DURATION = 15 * 60 * 1000; // 15 dakika

const MaterialUseList = ({ selectedDate, selectedProject }) => {
    const [materialUse, setMaterialUse] = useState([]);

    const fetchData = async () => {
        const cachedMaterials = localStorage.getItem(`materials`);
        const cachedTimestampMaterials = localStorage.getItem(`materials_timestamp`);

        if (cachedMaterials && cachedTimestampMaterials) {
            const age = Date.now() - parseInt(cachedTimestampMaterials, 10);
            if (age < CACHE_DURATION) {
                console.log('Veriler localStorage\'dan yükleniyor');
                setMaterialUse(JSON.parse(cachedMaterials));
                return;
            }
        }

        if (selectedDate && selectedProject) {
            try {
                const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/materials?populate=*`);
                const fetchedData = response.data.data;
                console.log(fetchedData);

                const dataForSelectedDate = fetchedData.filter(item => item.attributes.date === selectedDate);

                const ProjectAndDateCorrect = dataForSelectedDate.filter(item => item.attributes.project.data && item.attributes.project.data.id === selectedProject.id);

                setMaterialUse(ProjectAndDateCorrect);
                localStorage.setItem(`materials`, JSON.stringify(ProjectAndDateCorrect));
                localStorage.setItem(`materials_timestamp`, Date.now().toString
                    ());

            } catch (error) {
                console.log("hata", error);
            }
        } else {
            setMaterialUse([]);
        }
    }

    useEffect(() => {
        fetchData();
    }, [selectedDate, selectedProject]);

    return (
        <div className="material-use-list">
            <h3 className="div-header">Malzeme Kullanımı</h3>
            {materialUse.length > 0 ? (
                <ul className='material-list-ul'>
                    {materialUse.map((item, index) => (
                        <li className='material-list-li' key={index}>{item.attributes.name}: {item.attributes.amount} {item.attributes.type}</li>
                    ))}
                </ul>
            ) : (
                <p className='material-list-no-p'>Bu gün için malzeme girdisi bulunmamaktadır.</p>
            )}
        </div>
    );
};

export default MaterialUseList;
