import { useContext, useEffect, useState } from 'react';
import WheatherInput from './component/wheather-input.component';
import { DataContext } from './context/data.context';
import 'tailwindcss/tailwind.css';

function App() {
  const [data, setData] = useState(null);
    const [error, setError] = useState(false);
  const {weatherData}=useContext(DataContext);

  useEffect(()=>{
    const fetchDatas=async()=>{
      if(weatherData){
        try{
          const parsedData=JSON.parse(weatherData);
          setData(parsedData);
        }catch(error){
          setError(true);
        }
      }else{
        setData(null);
        setError(false)
      }
    };
    fetchDatas()
  },[weatherData])

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen max-h-460px max-w-1500px bg-gray-100">
      <span className='font-bold text-5x1 text-gray-900'>Whether App</span>
      <div className='grid max-w-4xl w-4/5 h-96 shadow-lg z-10'>
        <div className='input-button flex items-center justify-center m-0 p-6 h-20 flex '><WheatherInput/></div>
        {error?(
          alert('Invalid Location Please Try Again !')
        ):data?(
          <div className='weather-container grid items-center justify-center gap-y-10 h-full'>
            <div className='data-name flex justify-center items-center tracking-widest font-bold text-2xl w-full'><h2>{data.location.name}</h2></div>
            <div className='data-weather grid grid-cols-2 w-full h-full'>
              <div className='data-weather-image'><img src={`${data.current.condition.icon}`}/></div>
              <div className='data-weather-letter flex flex-col justify-center'>
                <span><h3>{data.current.temp_c} °C</h3></span>
                <span><h3>{data.current.feelslike_c} °C</h3></span>
              </div>
            </div>
            <div className='data-condition grid grid-cols-3 w-full h-full justify-between'>
              <span><h3>{data.current.wind_mph}</h3></span>
              <span><h3>{data.current.humidity}</h3></span>
              <span><h3>{data.current.cloud}</h3></span>
            </div>
          </div>
          ):(
            <div class="flex space-x-2 animate-pulse justify-center">
              <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>   
          )
        }
      </div>
    </div>
  );
}

export default App;
