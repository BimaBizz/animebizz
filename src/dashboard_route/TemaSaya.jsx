import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import Swicth from '../component/Switcher'

const TemaSaya = () => {
  const [customColor, setCustomColor] = useState('');
  const [state, setState] = useState({
    background: localStorage.getItem('Tema') || '', // Mengambil tema dari local storage
  });

  const handleChange = (color) => {
    setState({ background: color.hex });
    localStorage.setItem('Tema', color.hex);
    window.location.reload();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('Tema', customColor);
    window.location.reload();
  };

  

  return (
    <div>
      <h1 className='text-2xl font-bold text-red-600' style={{ color: state.background }}>Tema Saya</h1>
      <hr className='border-red-600 my-2' style={{ borderColor: state.background }} />
      <div className='mt-4 space-y-2'>
        <div className='flex items-center space-x-3'>
            <h2 className='dark:text-slate-300'>Tombol background thema kamu :</h2>
            <Swicth/>
        </div>
        <h2 className='dark:text-slate-300'>Pilih warna yang kami sediakan</h2>
        <div className='grid grid-cols-2 gap-3 mt-4'>
          <div className='flex justify-center items-center p-4'>
            <CirclePicker
              color={state.background}
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col justify-center items-center p-4'>
            <h2 className='dark:text-slate-300'>Pertinjau</h2>
            <button className='rounded-md bg-red-600 py-2 px-4 text-white' style={{ backgroundColor: state.background }}>Tombol</button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="colorSelect" className='flex flex-col dark:text-slate-300'>
            atau custom warna tema kamu sendiri :
            <div className='space-x-3'>
              <input
                type="text"
                className='border border-red-600 rounded-md p-2 my-2 w-2/3 placeholder-gray-500 dark:bg-transparent dark:text-slate-300 dark:placeholder-slate-300' 
                placeholder="Gunakan Hex color contoh #ffffff"
                onChange={(e) => setCustomColor(e.target.value)}
                style={{ borderColor: state.background }}
              />
              <button type='submit' className='rounded-md bg-red-600 py-2 px-4 text-white h-fit' style={{ backgroundColor: state.background }}>Simpan</button>
            </div>
          </label>
        </form>
      </div>
    </div>
  );
};

export default TemaSaya;
