import React, { useEffect, useState } from 'react';
import './MaterialUseList.scss';
import axios from 'axios';

const MaterialUseList = ({ selectedDate, selectedProject }) => {
    const [materialUse, setMaterialUse] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);

    const fetchData = async () => {
        if (selectedDate && selectedProject) {
            try {
                const response = await axios.get(`https://bold-animal-facf707bd9.strapiapp.com/api/materials?populate=*`);
                const fetchedData = response.data.data;
                console.log(fetchedData, "response for materialUse");

                const dataForSelectedDate = fetchedData.filter(item => item.attributes.date === selectedDate);
                console.log("selectedDate", selectedDate);
                console.log("dataforselecteddate", dataForSelectedDate);
                console.log("selectedProject", selectedProject);

                const ProjectAndDateCorrect = dataForSelectedDate.filter(item => item.attributes.project.data.attributes.projectName === selectedProject);

                setMaterialUse(ProjectAndDateCorrect);
            } catch (error) {
                console.log("hata");
            }
        }
        else {
            setMaterialUse([]);
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
                        <li className='material-list-li' key={index}>{item.attributes.name}: {item.attributes.amount} {item.attributes.type}</li>
                    ))}
                </ul>
            ) : (
                <p className='material-list-no-p'>Bu gün için malzeme kullanımı bulunmamaktadır.</p>
            )}
        </div>
    );
};

export default MaterialUseList;
