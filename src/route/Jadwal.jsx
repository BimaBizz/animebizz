import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Jadwal() {
  const [loading, setLoading] = useState(true);
  const [dataAnime, setDataAnime] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('https://animev1.bimabizz.my.id/api/anime/jadwal/terbaru');
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
          <title>ANIMEBIZZ.</title>
          <meta name="description" content="Jadwal Anime Terbaru dari AnimeBizz subtitle Indonesia tersedian 240P 360P 480P 720P MP4 size irit" />
      </Helmet>
          <Helmet>
              <title>ANIMEBIZZ | JADWAL</title>
              <meta name="description" content="Jadwal Anime Terbaru dari AnimeBizz subtitle Indonesia tersedian 240P 360P 480P 720P MP4 size irit" />
              <meta name="robots" content="INDEX" />
              <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
              <meta content="animebizz" name="author" />
              <link rel="canonical" href="https://anime.bimabizz.my.id/jadwal" />
              <link rel="Jadwal" href="https://anime.bimabizz.my.id" />
          </Helmet>
    </div>
      <div className='gap-4'>
        <h1 className='text-xl font-bold text-red-600 mb-4' style={{color : localStorage.getItem('Tema')}}>Jadwal Anime Terbaru</h1>
        {loading ? (
          <p>Loading...</p>
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
                            <h3 className='text-putih'>{list.title}</h3>
                            <p className='text-sm text-putih'>{list.time}</p>
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
