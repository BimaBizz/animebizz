import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AllEpisode = () => {
  const [loading, setLoading] = useState(true);
  const [allEpisodeData, setAllEpisodeData] = useState([]);
  const param = localStorage.getItem('param');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://animev1.bimabizz.my.id/api/anime/jadwal/allepisode/${param}`)
      .then((res) => res.json())
      .then((data) => {
        setAllEpisodeData(data.seasons);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [param]);

  const handleClick = () => {
    const param = localStorage.getItem('urlAPI')
    const resultParam = param.replace("https://animev1.bimabizz.my.id/api/anime/", "");
    localStorage.setItem('param', resultParam)
    navigate(`/anime/${resultParam}`)
  }

  return (
    <div>
      {loading ? (
        <div className='w-full h-full flex justify-center items-center'>
        <div className='loader'></div>
      </div>
      ) : allEpisodeData.length > 0 ? (
        <div className='m-4 space-y-4'>
          {allEpisodeData.map((season, seasonIndex) => (
            <div key={seasonIndex} className='p-2 bg-bg rounded-md'>
              <h2 className='text-red-600 font-bold p-2 rounded-md mb-3'
              style={{color : localStorage.getItem('Tema')}}
              >{season.seasonTitle}</h2>
              <div className='grid gap-2 md:grid-cols-3 lg:grid-cols-5'>
              {season.episodeLinks.map((episode, episodeIndex) => (
                  <button key={episodeIndex} className='border-red-600 shadow border rounded-md p-2 hover:shadow-red-600 hover:shadow-md dark:text-slate-300' 
                  style={{borderColor : localStorage.getItem('Tema'), boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`}}
                  onClick={() => handleClick(localStorage.setItem("urlAPI", episode.modifiedEpisodeUrl))}>{episode.episodeTitle}</button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No episode data available.</p>
      )}
    </div>
  );
};

export default AllEpisode;
