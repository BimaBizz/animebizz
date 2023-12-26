import React, { useState, useEffect } from 'react';
import { HiOutlineDotsVertical, HiOutlineBookOpen, HiChevronLeft, HiChevronRight, HiPlusCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Komik = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [dataAnime, setDataAnime] = useState([]);
  const [allDataAnime, setAllDataAnime] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState('https://animev1.bimabizz.my.id/api/komiku');
  const [tambahList, settambahList] = useState(false)
  const [showPopup, setShowPopup] = useState(false);

  const userTokenExists = localStorage.getItem('user') && localStorage.getItem('token');
  const userDetail = localStorage.getItem('user');
  const parsedUserDetail = userDetail ? JSON.parse(userDetail) : null;

  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await fetch(currentPage);
    
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

  const handleClickAnime = () => {
    setOpen(!open);
  };

  const handleNextPage = () => {
    if (allDataAnime.next_page !== null) {
      const nextPageHttps = allDataAnime.next_page.replace("http://", "https://");
      setCurrentPage(nextPageHttps);
    }
  };
  
  const handlePrevPage = () => {
    if (allDataAnime.prev_page !== null && allDataAnime.prev_page !== 'http://animev1.bimabizz.my.id/api/komiku?page=&tag=rekomendasi') {
      const prevPageHttps = allDataAnime.prev_page.replace("http://", "https://");
      setCurrentPage(prevPageHttps);
    } else if (allDataAnime.prev_page !== null && allDataAnime.prev_page === 'http://animev1.bimabizz.my.id/api/komiku?page=&tag=rekomendasi') {
      setCurrentPage('https://animev1.bimabizz.my.id/api/komiku');
    }
  };

  const handleTambahList = (anime) => {
    const komikSaya = localStorage.getItem('komikSaya') ? JSON.parse(localStorage.getItem('komikSaya')) : [];
    komikSaya.push(anime);
    localStorage.setItem('komikSaya', JSON.stringify(komikSaya));
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <>
    <div>
      <Helmet>
          <title>ANIMEBIZZ.</title>
          <meta name="description" content="ANIMEBIZZ Nonton Online Streaming Anime dan Baca Komik Subtitle Indonesia Kualitas Tinggi tersedia 240P 360P 480P 720P MP4 size irit" />
      </Helmet>
  
      <>
          <Helmet>
          <title>ANIMEBIZZ | KOMIK</title>
          <meta name="description" content="ANIMEBIZZ Baca Komik Online dan Nonton Streaming Anime Subtitle Indonesia Kualitas Tinggi tersedia 240P 360P 480P 720P MP4 size irit" />
          <meta name="robots" content="INDEX" />
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta content="komikbizz" name="author" />
          <link rel="canonical" href="https://anime.bimabizz.my.id" />
          <link rel="Jadwal" href="https://anime.bimabizz.my.id/jadwal" />
          </Helmet>
      </>
    </div>
    <div className="p-4 bg-bg rounded-md">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold text-red-600"
        style={{color: localStorage.getItem('Tema')}}
        >Komik Terbaru</h1>
        <button onClick={handleClickAnime} className='w-auto h-auto md:hidden block text-white' aria-label='mini_mize'>
          <HiOutlineDotsVertical />
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={`${open ? '' : 'hidden'}`}>
          <div className=' grid md:grid-cols-3 lg:grid-cols-4 gap-3'>
            {dataAnime.map((anime) => (
              <div key={anime.param} className='grid border border-red-600 p-3 rounded-md space-y-3 group hover:shadow-md hover:shadow-red-600/50 transition-shadow duration-500'
              style={{borderColor: localStorage.getItem('Tema'), boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`}}
              >
                <div className='relative w-full h-56 overflow-hidden rounded-md shadow-lg'>
                  <div className='absolute z-10 right-2 top-2 bg-red-600 p-1 rounded-md' style={{backgroundColor: localStorage.getItem('Tema')}}>
                    <h1 className='text-white text-xs'>{anime.latest_chapter}</h1>
                  </div>
                  <img src={anime.thumbnail} alt={anime.title} className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-500'/>
                </div>
                <h1 className='font-bold'>{anime.title}</h1>
                <p className='text-sm'>{anime.description}</p>
                <div className='flex flex-col place-content-end gap-2'>
                  <button className='bg-red-600 text-white px-3 py-1 rounded  flex justify-center items-center' 
                  style={{backgroundColor: localStorage.getItem('Tema')}}
                  onClick={() => navigate(`/komik/${anime.param}`)(localStorage.setItem('urlAPI', anime.detail_url), localStorage.setItem('param', anime.param))}><span className='mr-1'><HiOutlineBookOpen /></span>Baca Komik</button>
                  {!tambahList ? (
                      ""
                    ):(
                      <button className='bg-red-600 text-white px-3 py-1 rounded flex justify-center items-center' 
                      style={{backgroundColor: localStorage.getItem('Tema')}}
                      onClick={() => handleTambahList(anime)}><span className='mr-1'><HiPlusCircle /></span>Baca Nanti</button>
                    )}
                </div>
              </div>
            ))}
          </div>
          {showPopup && (
                  <div className="fixed bottom-5 left-5 bg-white text-red-600 p-3 rounded-md shadow-md shadow-red-600/50 text-sm md:text-base"
                  style={{borderColor: localStorage.getItem('Tema'), color: localStorage.getItem('Tema'), boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`}}
                  >
                    Anime berhasil ditambahkan ke Baca Nanti!
                  </div>
                )}
          <div className="flex justify-between mt-5">
            <button onClick={handlePrevPage} disabled={!allDataAnime.prev_page} className='bg-red-600 text-white px-3 py-1 rounded font-bold text-2xl'
            style={{backgroundColor: localStorage.getItem('Tema')}}
            aria-label='prev'>
              <HiChevronLeft />
            </button>
            <button onClick={handleNextPage} disabled={!allDataAnime.next_page} className='bg-red-600 text-white px-3 py-1 rounded font-bold text-2xl'
            style={{backgroundColor: localStorage.getItem('Tema')}}
            aria-label='next'>
              <HiChevronRight/>
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Komik;
