import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseContext = React.createContext({
    nutrients: [],
    updateNutrients: function () { },
    dailyTargetValues: {},
    updateDailyTargetValues: function () { }
});

export function DatabaseContextProvider(props) {
    const [nutrients, setNutrients] = useState([]);
    const [dailyTargetValues, setDailyTargetValues] = useState({});

    function updateNutrients() {
        axios.get('http://localhost:8080/nutrients')
            .then(response => setNutrients(response.data))
            .catch(error => console.log(error));
    }

    function updateDailyTargetValues() {
        axios.get('http://localhost:8080/settings')
            .then(response => setDailyTargetValues(response.data))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        updateNutrients();
        updateDailyTargetValues();
    }, []);

    return (
        <DatabaseContext.Provider value={{
            nutrients,
            updateNutrients,
            dailyTargetValues,
            updateDailyTargetValues
        }}>
            {props.children}
        </DatabaseContext.Provider>
    );
}

export default DatabaseContext;
