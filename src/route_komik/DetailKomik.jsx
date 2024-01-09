import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const DetailKomik = () => {
    const [dataKomik, setDataKomik] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const getUrl = localStorage.getItem('urlAPI')
    const urlKomik = getUrl.replace("http://", "https://");
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
          const response = await fetch(urlKomik);
    
          if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
          }
    
          const data = await response.json();
          setDataKomik(data.data);
    
          if (data.data && data.data.chapters && data.data.chapters.length > 0) {
            const allDetailUrls = data.data.chapters.map((chapter) => chapter.detail_url);
            // Reverse the order of the allDetailUrls array
            const reversedDetailUrls = allDetailUrls.reverse();
            localStorage.setItem('allChapterUrls', JSON.stringify(reversedDetailUrls));
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [urlKomik]);

    return (
        <>
          <div>
            {loading ? (
            <div className='w-full h-full flex justify-center items-center'>
            <div className='loader'></div>
          </div>
            ):(
                <div className='m-4 space-y-3'>
                    <h1 className='text-xl md:text-2xl font-bold text-red-600' style={{color: localStorage.getItem('Tema')}}>{dataKomik.title}</h1>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                        <div className='w-full h-auto overflow-hidden rounded-md place-items-center'>
                            <img src={dataKomik.thumbnail} alt={dataKomik.param} className='object-cover hover:scale-110 transition-transform duration-500'/>
                        </div>
                        <div className='space-y-3 md: col-span-2'>
                            <p className='text-justify dark:text-slate-300'>{dataKomik.synopsis}</p>
                            <div className='flex flex-wrap gap-1'>
                                {dataKomik.genre.map((item, index) => (
                                <div key={index} className='p-2 bg-red-600 hover:bg-fourt/50 rounded-md transition-colors duration-500' style={{backgroundColor: localStorage.getItem('Tema')}}>
                                    <p className='text-white'>{item}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <h2 className='text-red-600 w-full text-center text-xl font-bold' style={{color: localStorage.getItem('Tema')}}>Semua Chapters</h2>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                        {dataKomik.chapters.map((item, index) => (
                        <button key={index} className='p-2 border border-red-600 rounded-md space-y-2'
                        style={{borderColor: localStorage.getItem('Tema')}}
                        onClick={() => {
                          navigate(`/komik/baca-komik/${item.param}`);
                          localStorage.setItem('KomikurlAPI', item.detail_url);
                          localStorage.setItem('paramKomik', item.param);
                        }}>
                            <h3 className='font-bold dark:text-slate-300'>{item.chapter}</h3>
                            <p className=' dark:text-slate-300'>{item.release}</p>
                        </button>
                        ))}
                    </div>
                </div>
            )}
            
          </div>
        </>
      );
}

export default DetailKomik