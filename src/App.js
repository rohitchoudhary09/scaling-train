import logo from './logo.svg';
import './App.css';
import curtain from '../src/images/curtain.png';
import Masonry from '@mui/lab/Masonry';

import {BiSearchAlt} from 'react-icons/bi';
import { useEffect, useState } from 'react';
import {motion} from 'framer-motion';

function App() {

  const [img, setImg] = useState("");
  const [res, setRes] = useState([]); 

  const fetchRequest = async() => {
    const data = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_API_KEY}`);
    const dataJ = await data.json();
    const result = await dataJ.results;
    setRes(result);
    console.log(res);
  }
  const submit = () => {
    fetchRequest();

  }

  useEffect(() => {
    fetchRequest();
  }, [])

  return (
    <div className='bg-[#184642] text-[#978d61]' >

      <img src={curtain} alt="curtain" className='absolute' />

      <motion.h1 animate={{ opacity: 1, scale: [1, 1.1, 1] }} initial={{ opacity: 0 }} exit={{ opacity:0 }} transition={{ ease: "easeOut", duration: 2 }} className='text-9xl w-4/5 m-auto text-center pt-80 milky'>Anushri</motion.h1>

      <div className='text-center poppins pb-80 mt-32 flex align-center justify-center'>

        <input placeholder='Enter Anything...' className='bg-transparent rounded-full p-4 text-[#978d61] placeholder:text-[#978d61] border-2 border-[#978d61] outline-[#978d61] w-1/3' value={img} onChange={(e) => setImg(e.target.value)}/>

        <button className='ml-4' onClick={submit}><BiSearchAlt size={30} /></button>

      </div>

      <div className='mt-12 w-4/5 m-auto'>

      <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3 }} spacing={{ xs: 1, sm: 2, md: 3 }}>

        {res.map((item, index) => (

          <div key={index}>

            <img
              src={`${item.urls.raw}?w=162&auto=format`}
              srcSet={`${item.urls.raw}?w=162&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                borderBottomLeftRadius: 4,
                borderBottomRightRadius: 4,
                display: 'block',
                width: '100%',
              }}
            />

          </div>

        ))}

      </Masonry>
      </div>
    </div>
  );
}

export default App;


