import { createContext, useEffect, useState } from "react";
import {toast,ToastContainer} from 'react-toastify';

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
            if (response.status === 400 || response.status===403) { 
                toast.error('Lütfen geçerli bir konum girin.');
                setWeatherData('');
                fetchData('');
                return;
            }else{
                const result = await response.text();
                setWeatherData(result);
            }
        } catch (error) {
            console.error(error,'error');
        }
    };
    useEffect(()=>{
        fetchData(inputValue);
    },[inputValue])

    return(
        <DataContext.Provider value={{weatherData,fetchData}}>
            {children}
            <ToastContainer />
        </DataContext.Provider>
    )
}
export default DataProvider