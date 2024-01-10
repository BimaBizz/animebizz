import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbaar from "./component/Navbaar";
import Footer from "./component/Footer";
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineFilm } from "react-icons/hi";

export default function App() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // No need to fetch data here. Let useEffect handle it.
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/anime?s=${search}`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch data if search is not empty
    if (search.trim() !== '') {
      fetchData();
    }
  }, [search]); // useEffect will run whenever the 'search' state changes

  // Conditionally render the search button only on the home page ('/')
  const isHomePage = location.pathname === '/';
  const renderSearchButton = isHomePage && (
    <div className='sticky z-50 bottom-4 w-full'>
      <div className='w-full flex justify-end px-4'>
        <button
          type="button"
          className='flex items-center justify-center p-4 bg-red-600 text-white h-16 w-16 rounded-full text-2xl border-2 border-white hover:shadow-md hover:shadow-red-600'
          onClick={handleClick}
          style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff', boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`}}
        >
          <FiSearch />
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <div className='sticky z-50 top-0 w-full'>
        {!open ? (
          <div className='absolute z-50 w-full h-screen p-4 bg-black/50 backdrop-blur-sm flex items-center justify-center'>
            <div className="w-full max-w-5xl bg-white/30 p-4 rounded-lg">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="w-full p-2 rounded-md outline-none"
                  placeholder="search ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
              <hr className="border-white my-3" />
              <div className="max-h-[55vh] grid overflow-auto gap-4">
                {data.map((anime) => (
                  <div key={anime.param} className='flex border border-fourt p-3 rounded-md space-y-3 group hover:shadow-md hover:shadow-fourt transition-shadow duration-500 gap-4'>
                    <div className='w-1/2 h-56 overflow-hidden rounded-md shadow-lg'>
                      <img src={anime.thumbnail} alt={anime.title} className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-500'/>
                    </div>
                    <div className="space-y-3">
                      <h1 className='font-bold'>{anime.title}</h1>
                      <button
                        className='bg-red-600 text-white px-3 py-1 rounded w-fit flex justify-center items-center'
                        onClick={() => {
                          navigate(`/anime/${anime.param}`);
                          localStorage.setItem('urlAPI', anime.detail_url);
                          localStorage.setItem('param', anime.param);
                          setOpen(!open);
                        }}
                        style={{backgroundColor: localStorage.getItem('Tema')}}
                      >
                        <span className='mr-2'><HiOutlineFilm /></span>Tonton
                      </button>
                      <h2 className='text-sm'>{anime.upload_time}</h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <Navbaar />
      <div className="h-full min-h-screen p-4">
        <Outlet />
      </div>
      {renderSearchButton}
      <Footer />
    </div>
  );
}
