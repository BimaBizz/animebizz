import React, { useState } from 'react'
import { CirclePicker } from 'react-color';

const TemaSaya = () => {
    const [customColor, setCustomColor] = useState('');
    const [state, setState] = useState({
        background: '',
    })
    const handleChange = (color) => {
        setState({ background: color.hex });
        localStorage.setItem('Tema', color.hex);
        window.location.reload()
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('Tema', customColor);
        window.location.reload()
    }
    
  return (
    <div>
        <h1 className='text-2xl font-bold text-red-600' style={{ color: localStorage.getItem('Tema') }}>Tema Saya</h1>
        <hr className='border-red-600 my-2'style={{ borderColor: localStorage.getItem('Tema') }}/>
        <div className='mt-4 space-y-2'>
            <h2>Pilih warna yang kami sediakan</h2>
            <div className='grid grid-cols-2 gap-3 mt-4'>
            <div className='flex justify-center items-center p-4'>
            <CirclePicker
            color={state.background }
            onChange={handleChange}
            />
            </div>
            <div className='flex flex-col justify-center items-center p-4'>
                <h2>Pertinjau</h2>
                <button className='rounded-md bg-red-600 py-2 px-4 text-white' style={{ backgroundColor: localStorage.getItem('Tema') }}>Tombol</button>
            </div>
            </div>
            <form onSubmit={handleSubmit} className=''>
                <label htmlFor="colorSelect" className='flex flex-col'>
                Custom warna tema kami :
                <input
                    type="text"
                    className='border border-red-600 rounded-md p-2 my-2 w-full lg:w-1/2 placeholder-gray-500'
                    placeholder="Gunakan Hex color contoh #ffffff"
                    onChange={(e) => setCustomColor(e.target.value)}
                    style={{ borderColor: localStorage.getItem('Tema') }}
                />
                </label>

                <button type='submit' className='rounded-md bg-red-600 py-2 px-4 text-white' style={{backgroundColor: localStorage.getItem('Tema')}}>Simpan</button>
            </form>
        </div>
    </div>
  )
}

export default TemaSaya