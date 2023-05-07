import { createContext, useEffect, useState } from "react";

export const DataContext=createContext();

const DataProvider=({children,inputValue})=>{
    const [weatherData, setWeatherData] = useState(null);

    const [receivedValue, setReceivedValue] = useState('');
    const handleButtonClick = (inputValue) => {
        setReceivedValue(inputValue);
    };
    const fetchData=async(value)=>{
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${value?value:'istanbul'}`;
        const options = {
            method: 'GET',
            headers: {
            'X-RapidAPI-Key': '#',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            },
        };
        try {
            const response = await fetch(url, options);
            const result = await response.text();
            setWeatherData(result);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(()=>{
        fetchData(inputValue);
    },[inputValue])
    useEffect(() => {
        if (weatherData) {
          console.log('Data received:', weatherData);
        }
      }, [weatherData]);

    return(
        <DataContext.Provider value={{weatherData,fetchData}}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider