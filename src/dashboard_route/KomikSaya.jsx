import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMiniXCircle } from "react-icons/hi2";

const KomikSaya = () => {
  const [komikSaya, setKomikSaya] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedKomikSaya = localStorage.getItem('komikSaya');
    
    if (storedKomikSaya) {
      const parsedKomikSaya = JSON.parse(storedKomikSaya);
      setKomikSaya(parsedKomikSaya);
    }
  }, []);

  const handleDelete = (index) => {
    const updatedKomikSaya = komikSaya.filter((_, i) => i !== index);
    setKomikSaya(updatedKomikSaya);
    localStorage.setItem('komikSaya', JSON.stringify(updatedKomikSaya));
  };

  return (
    <div className=''>
      <h1 className='text-2xl font-bold text-red-600' style={{ color: localStorage.getItem('Tema') }}>Komik Saya</h1>
      <hr className='border-red-600 my-2' style={{ borderColor: localStorage.getItem('Tema') }} />
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
        {komikSaya.map((anime, index) => (
          <div key={anime.param} className='relative flex flex-col border border-red-600 p-3 rounded-md space-y-3 group hover:shadow-md hover:shadow-red-600 transition-shadow duration-500'
            style={{ boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`, borderColor: localStorage.getItem('Tema') }}
          >
            <button
              className='absolute z-10 top-2 right-2 bg-red-600 text-white p-1 rounded-md text-xl'
              style={{ backgroundColor: localStorage.getItem('Tema') }}
              onClick={() => handleDelete(index)}
            >
              <HiMiniXCircle />
            </button>
            <div className='w-full h-56 overflow-hidden rounded-md shadow-lg'>
              <img src={anime.thumbnail} alt={anime.title} className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-500' />
            </div>
            <h1 className='font-bold'>{anime.title}</h1>
            <button
              className='text-white bg-red-600 p-2 rounded-md'
              style={{ backgroundColor: localStorage.getItem('Tema') }}
              onClick={() => navigate(`/komik/${anime.param}`)(localStorage.setItem('urlAPI', anime.detail_url), localStorage.setItem('param', anime.param))}
            >
              Baca
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KomikSaya;
