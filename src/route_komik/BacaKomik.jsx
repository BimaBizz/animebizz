import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const BacaKomik = () => {
    const navigate = useNavigate()
    const lastParam = localStorage.getItem('param')
    const apiKomik = localStorage.getItem('KomikurlAPI')
    const modifiedApi = apiKomik.replace("http://", "https://");
    const [dataGambar, setDataGambar] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentIndex, setCurrentIndex] = useState('')

    
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const response = await fetch(modifiedApi);
            if (!response.ok) {
              throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            const result = await response.json();
            setDataGambar(result);
            setCurrentIndex(localStorage.getItem('allChapterUrls').indexOf(`"${apiKomik}"`))
    console.log("index : ", currentIndex)
          } catch (error) {
            console.error('Error fetching data:', error);
            // Tampilkan pesan kesalahan kepada pengguna
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, [modifiedApi]);
      

  return (
    <div className='space-y-3'>
        <div className='grid md:grid-cols-2 gap-2'>
        {dataGambar.data && dataGambar.data.map((item, index) => (
            <div className='relative rounded-md overflow-hidden border-black border' key={index}>
                <div className='absolute top-0 text-xs p-2 bg-red-600 rounded-md w-5 h-5 flex items-center justify-center'
                style={{backgroundColor: localStorage.getItem('Tema')}}
                >
                    <h1 className='text-white'>{index + 1}</h1>
                </div>
                <img src={item} alt={item} />
            </div>
        ))}
        </div>
        <button className='top-0 bg-red-600 text-white p-3 rounded-md'
        style={{backgroundColor: localStorage.getItem('Tema')}}
        onClick={() => navigate(`/komik/${lastParam}`)}>Baca Chapter Lain</button>
    </div>
  )
}

export default BacaKomik