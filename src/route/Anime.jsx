import React, { useState, useEffect } from 'react';
import { HiOutlineDotsVertical, HiOutlineFilm, HiChevronLeft, HiChevronRight, HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Chiby from '../../public/apple-touch-icon.gif'

const Anime = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [dataAnime, setDataAnime] = useState([]);
  const [allDataAnime, setAllDataAnime] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tambahList, settambahList] = useState(false)
  const [showPopup, setShowPopup] = useState(false);

  const userTokenExists = localStorage.getItem('user') && localStorage.getItem('token');
  const userDetail = localStorage.getItem('user');
  const parsedUserDetail = userDetail ? JSON.parse(userDetail) : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/anime?page=${currentPage}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        setDataAnime(data.data);
        setAllDataAnime(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (parsedUserDetail && parsedUserDetail.providerData && parsedUserDetail.providerData.length > 0) {
      if(parsedUserDetail.providerData[0].email
          == null){
          settambahList(false)
      }else{
          settambahList(true)
      }
  }

    fetchData();
  }, [currentPage]);


  const handleNextPage = () => {
    if (currentPage < allDataAnime.max_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTambahList = (anime) => {
    const animeSaya = localStorage.getItem('animeSaya') ? JSON.parse(localStorage.getItem('animeSaya')) : [];
    animeSaya.push(anime);
    localStorage.setItem('animeSaya', JSON.stringify(animeSaya));
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <>
    <div>
      <Helmet>
          <title>DILARANG ASAL COMOT</title>
          <meta name="description" content="DILARANG ASAL COMOT Nonton Online Streaming Anime dan Baca Komik Subtitle Indonesia Kualitas Tinggi tersedia 240P 360P 480P 720P MP4 size irit" />
          <meta name="robots" content="INDEX" />
              <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
              <meta content="DILARANG ASAL COMOT" name="author" />
              <link rel="Jadwal" href="https://anime.bimabizz.my.id/jadwal"/>
              <link rel="Komik" href="https://anime.bimabizz.my.id/komik"/>
              <link rel="List Anime" href="https://anime.bimabizz.my.id/list-anime"/>
      </Helmet>
  
      <>
          <Helmet>
              <title>DILARANG ASAL COMOT | HOME</title>
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
      </>
    </div>
    <div className="rounded-md">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-red-600" style={{color : localStorage.getItem('Tema')}}>Anime Terbaru</h1>
      </div>
      {loading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <div className='loader'></div>
        </div>
      ) : (
        <div className={`${open ? '' : 'hidden'}`}>
          <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {dataAnime.map((anime) => (
              <div key={anime.param} className='grid border border-red-600 p-3 rounded-md space-y-3 group hover:shadow-md hover:shadow-red-600 transition-shadow duration-500'
              style={{boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`, borderColor: localStorage.getItem('Tema')}}>
                <div className='w-full h-56 overflow-hidden rounded-md shadow-lg'>
                  <img src={anime.thumbnail} alt={anime.title} className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-500'/>
                </div>
                <h1 className='font-bold dark:text-slate-300'>{anime.title}</h1>
                <h2 className='text-sm dark:text-slate-300'>{anime.upload_time}</h2>
                <div className='flex flex-col place-content-end gap-2'>
                  <button className='bg-red-600 text-white px-3 py-1 rounded w-full flex justify-center items-center' onClick={() => navigate(`/anime/${anime.param}`)(localStorage.setItem('urlAPI', anime.detail_url), localStorage.setItem('param', anime.param))}
                  style={{backgroundColor: localStorage.getItem('Tema')}}
                  ><span className='mr-1'><HiOutlineFilm /></span>Tonton</button>
                  {!tambahList ? (
                    ""
                  ):(
                    <button className='bg-red-600 text-white px-3 py-1 rounded w-full flex justify-center items-center' onClick={() => handleTambahList(anime)} style={{backgroundColor: localStorage.getItem('Tema')}}><span className='mr-1'><HiPlusCircle /></span>Tonton Nanti</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {showPopup && (
            <div className="fixed bottom-5 left-5 bg-white text-red-600 p-3 rounded-md shadow-md shadow-red-600/50 text-sm md:text-base" style={{boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`, color: localStorage.getItem('Tema')}}>
              Anime berhasil ditambahkan ke Tonton Nanti!
            </div>
          )}
          <div className="flex justify-between mt-5">
            <button onClick={handlePrevPage} disabled={!allDataAnime.prev_page} className='bg-red-600 text-white px-3 py-1 rounded font-bold text-2xl' style={{backgroundColor: localStorage.getItem('Tema')}} aria-label='prev'>
              <HiChevronLeft />
            </button>
            <button onClick={handleNextPage} disabled={!allDataAnime.next_page} className='bg-red-600 text-white px-3 py-1 rounded font-bold text-2xl' style={{backgroundColor: localStorage.getItem('Tema')}} aria-label='next'>
              <HiChevronRight/>
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Anime;
