import React, { useEffect, useState } from 'react';
import './MaterialUseList.scss';
import axios from 'axios';

const CACHE_DURATION = 15 * 60 * 1000;

const MaterialUseList = ({ selectedDate, selectedProject }) => {
    const [materialUse, setMaterialUse] = useState([]);

    const fetchData = async () => {
        const cachedMaterials = localStorage.getItem(`materials`);
        const cachedTimestampMaterials = localStorage.getItem(`materials_timestamp`);

        if (cachedMaterials && cachedTimestampMaterials) {
            const age = Date.now() - parseInt(cachedTimestampMaterials, 10);
            if (age < CACHE_DURATION) {
                setMaterialUse(JSON.parse(cachedMaterials));
                return;
            }
        }

        if (selectedDate && selectedProject) {
            try {
                const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/materials?populate=*`);
                const fetchedData = response.data.data;

                const dataForSelectedDate = fetchedData.filter(item => item.attributes.date === selectedDate);

                const ProjectAndDateCorrect = dataForSelectedDate.filter(item => item.attributes.project.data && item.attributes.project.data.id === selectedProject.id);

                setMaterialUse(ProjectAndDateCorrect);
                localStorage.setItem(`materials`, JSON.stringify(ProjectAndDateCorrect));
                localStorage.setItem(`materials_timestamp`, Date.now().toString
                    ());

            } catch (error) {
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
                <table className='material-list-table'>
                    <thead>
                        <tr>
                            <th>Malzeme İsmi</th>
                            <th>Miktar</th>
                            <th>Cins</th>
                            <th>Eylem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materialUse.map((item, index) => (
                            <tr className='material-list-tr' key={index}>
                                <td>{item.attributes.name}</td>
                                <td>{item.attributes.amount}</td>
                                <td>{item.attributes.type}</td>
                                <td>{item.attributes.input === "input" ? "girdi" : "çıktı"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className='material-list-no-p'>Bu gün için malzeme girdisi bulunmamaktadır.</p>
            )}
        </div>

    );
};

export default MaterialUseList;
