import {useContext, useRef, useState } from 'react'
import './wheather.style.css'
import { DataContext } from '../context/data.context'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WheatherInput=()=>{
    const inputRef=useRef();
    const [inputValue, setInputValue] = useState('');
    const dataContext = useContext(DataContext);


    const handleInputValue=()=>{
        const value= inputRef.current.value;
        setInputValue(value);
        console.log('butona tıkladın');
    };
    const handleButtonClick = () => {
        dataContext.fetchData(inputValue);
      };
     
    return(
        <div className='input-button flex'>
            <input className='input p-2 flex-grow-1 border border-gray-400 rounded-1-lg ' placeholder='Location' type='text' value={inputValue} ref={inputRef} onChange={handleInputValue} />
            <button className='button p-2 rounded-r-lg bg-blue-600 text-white hover:bg-blue-700' onClick={handleButtonClick}>Whethear</button>
        </div>

    )
}
export default WheatherInput