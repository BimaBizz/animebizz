import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";

const AllEpisode = () => {
  const [loading, setLoading] = useState(true);
  const [allAnime, setAllAnime] = useState([]);
  const [minimizedGroups, setMinimizedGroups] = useState([]);
  const param = localStorage.getItem('param');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://animev1.bimabizz.my.id/api/anime-list`)
      .then((res) => res.json())
      .then((data) => {
        const dataArray = Object.entries(data.data).map(([key, value]) => ({
          key,
          data: value,
        }));

        setAllAnime(dataArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [param]);

  const handleClick = (url) => {
    const resultParam = url.replace("https://animev1.bimabizz.my.id/api/anime/jadwal/allepisode/", "");
    localStorage.setItem('param', resultParam);
    navigate(`/allepisode/${resultParam}`);
  }

  const toggleMinimized = (groupKey) => {
    setMinimizedGroups((prevMinimizedGroups) => {
      if (prevMinimizedGroups.includes(groupKey)) {
        return prevMinimizedGroups.filter((key) => key !== groupKey);
      } else {
        return [...prevMinimizedGroups, groupKey];
      }
    });
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className='gap-4'>
            <h1 className='text-xl font-bold text-red-600 mb-4' style={{ color: localStorage.getItem('Tema') }}>Semua Anime</h1>
            {allAnime && allAnime.map((group) => (
              <div key={group.key} className='gap-2 p-3'>
                <div className='mb-3 flex justify-between items-center'>
                  <h1 className='font-bold text-red-600' style={{ color: localStorage.getItem('Tema') }}>Group : {group.key}</h1>
                  <button
                    className='text-red-600'
                    style={{ color: localStorage.getItem('Tema') }}
                    onClick={() => toggleMinimized(group.key)}
                  >
                    {minimizedGroups.includes(group.key) ? <HiPlusCircle /> : <HiMinusCircle />}
                  </button>
                </div>
                {!minimizedGroups.includes(group.key) && (
                  <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-2'>
                    {group.data.map((item, index) => (
                      <div
                        key={index}
                        className='border border-red-600 p-2 rounded-md shadow-md space-y-2 hover:cursor-pointer  hover:shadow-md group'
                        style={{ boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`, borderColor: localStorage.getItem('Tema') }}
                        onClick={() => handleClick(item.url)}
                      >
                        <h2 className='text-center w-full'>{item.title}</h2>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllEpisode;
