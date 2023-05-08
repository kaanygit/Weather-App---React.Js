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
      <div className="container mx-auto flex flex-col items-center justify-center h-screen max-h-460px max-w-1500px bg-gradient-to-r from-gray-50 to-slate-400">
        {/* <span className='font-bold text-5x1 text-gray-900 border-b border-gray-600'>Whether App</span> */}
        <div className='grid max-w-4xl w-4/5 h-96 shadow-lg z-10 bg-gray-200'>
          <div className='input-button flex items-center justify-center m-0 p-6 h-20 flex '><WheatherInput/></div>
          {error?(
            alert('Invalid Location Please Try Again !')
          ):data?(
            <div className='weather-container grid items-center justify-center gap-y-10 h-full '>
              <div className='data-name flex justify-center items-center tracking-widest font-bold text-2xl w-full'><h2 className='border-b border-gray-600 pb-2'>{data.location.name}</h2></div>
              <div className='data-weather grid grid-cols-2 w-full h-full'>
                <div className='data-weather-image'><img src={`${data.current.condition.icon}`} className='w-4/5 h-full' alt=""/></div>
                <div className='data-weather-letter flex flex-col justify-center'>
                  <span className='asdas flex font-bold m-0 h-10'>Temperature - <h3 className='asd pl-2'>{data.current.temp_c} °C</h3></span>
                  <span className='sad flex'>Feels - <h3 className='adadf pl-2'>{data.current.feelslike_c} °C</h3></span>
                </div>
              </div>
              <div className='data-condition grid grid-cols-3 w-full h-full justify-between'>
                <div className='text-center'>
                  <span className='wind justify-center border-b border-gray-600 '>Wind</span>
                  <h3 className='justify-center items-center'>{data.current.wind_mph}</h3>
                </div>
                <div className='text-center'>
                  <span className='humidity justify-center border-b border-gray-600 '>Humidity</span>
                  <h3 className='justify-center items-center'>{data.current.humidity}</h3>
                </div>
                <div className='text-center'>
                  <span className='justify-center border-b border-gray-600 '>Clouds</span>
                  <h3 className='justify-center items-center'>{data.current.cloud}</h3>
                </div>
              </div>
            </div>
            ):(
              <div className="flex space-x-2 animate-pulse justify-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              </div>   
            )
          }
        </div>
      </div>
  );
}

export default App;
