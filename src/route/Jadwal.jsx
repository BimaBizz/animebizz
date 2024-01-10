import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Chiby from '../../public/apple-touch-icon.gif'

function Jadwal() {
  const [loading, setLoading] = useState(true);
  const [dataAnime, setDataAnime] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('/api/anime/jadwal/terbaru');
          const data = await response.json();
          setDataAnime(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      fetchData();
  }, []);

  const handleClick = () => {
    const param = localStorage.getItem('urlAPI')
    const resultParam = param.replace("https://animeav1.bimabizz.my.id/api/anime/jadwal/allepisode/", "");
    localStorage.setItem('param', resultParam)
    navigate(`/allepisode/${resultParam}`)
  }

  return (
    <>
      <div>
          <Helmet>
              <title>DILARANG ASAL COMOT | JADWAL</title>
              <link rel="canonical" href="https://anime.bimabizz.my.id"/>
              <meta name="description" content="DILARANG ASAL COMOT - Nonton Online Streaming Anime dan Baca Komik Subtitle Indonesia Kualitas Tinggi tersedia 240P 360P 480P 720P MP4 size irit"/>
              <meta name="keywords" content="anime, streaming, komik, subtitle Indonesia"/>
              <meta name="robots" content="INDEX, FOLLOW, MAX-IMAGE-PREVIEW:LARGE, MAX-SNIPPET:-1, MAX-VIDEO-PREVIEW:-1"/>
              <meta name="author" content="DILARANG ASAL COMOT"/>
              <meta property="og:title" content="DILARANG ASAL COMOT | HOME"/>
              <meta property="og:type" content="website"/>
              <meta property="og:url" content="https://anime.bimabizz.my.id"/>
              <meta property="og:image" content={Chiby}/>
              <meta property="og:description" content="DILARANG ASAL COMOT - Nonton Online Streaming Anime dan Baca Komik Subtitle Indonesia Kualitas Tinggi tersedia 240P 360P 480P 720P MP4 size irit"/>
              <meta name="twitter:card" content="summary_large_image"/>
              <meta name="twitter:title" content="DILARANG ASAL COMOT | HOME"/>
              <meta name="twitter:description" content="DILARANG ASAL COMOT - Nonton Online Streaming Anime dan Baca Komik Subtitle Indonesia Kualitas Tinggi tersedia 240P 360P 480P 720P MP4 size irit"/>
              <meta name="twitter:image" content={Chiby}/>
          </Helmet>
    </div>
      <div className='gap-4'>
        <h1 className='text-xl font-bold text-red-600 mb-4' style={{color : localStorage.getItem('Tema')}}>Jadwal Anime Terbaru</h1>
        {loading ? (
          <div className='w-full h-full flex justify-center items-center'>
          <div className='loader'></div>
        </div>
        ) : (
          <div className='space-y-3'>
            {dataAnime.map((anime, index) => (
              <div key={index} className='p-3 rounded-md'>
                <h2 className='text-lg font-bold mb-2 text-red-600' style={{color : localStorage.getItem('Tema')}}>{anime.day}</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {anime.shows.map((list, index) => (
                        <button key={index} className='border border-red-600 p-2 rounded-md shadow-md space-y-2 hover:cursor-pointer  hover:shadow-md group'
                         style={{boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`, borderColor: localStorage.getItem('Tema')}}
                         onClick={() => handleClick(localStorage.setItem("urlAPI", list.url))}>
                            <h3 className='dark:text-slate-300'>{list.title}</h3>
                            <p className='text-sm dark:text-slate-300'>{list.time}</p>
                        </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Jadwal;
