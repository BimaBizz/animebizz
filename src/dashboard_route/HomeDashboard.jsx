import React from 'react'
import { HiVideoCamera, HiBookOpen } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const HomeDashboard = () => {
    const navigate = useNavigate();
    const anime = localStorage.getItem('animeSaya') ? JSON.parse(localStorage.getItem('animeSaya')) : [];
    const komik = localStorage.getItem('komikSaya') ? JSON.parse(localStorage.getItem('komikSaya')) : [];


  return (
    <>
    <Helmet>
          <title>ANIMEBIZZ.</title>
          <meta name="description" content="ANIMEBIZZ Nonton Online Streaming Anime dan Baca Komik Subtitle Indonesia Kualitas Tinggi tersedia 240P 360P 480P 720P MP4 size irit" />
          <meta name="robots" content="INDEX" />
              <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
              <meta content="animebizz" name="author" />
              <link rel="canonical" href="https://anime.bimabizz.my.id" />
              <link rel="Jadwal" href="https://anime.bimabizz.my.id/jadwal" />
              <link rel="Komik" href="https://anime.bimabizz.my.id/komik" />
              <link rel="Login" href="https://anime.bimabizz.my.id/login" />
      </Helmet>
  
      <>
          <Helmet>
              <title>ANIMEBIZZ | DASHBOARD</title>
              <meta name="description" content="ANIMEBIZZ dashboard user for management their anime, theme and chat" />
              <meta name="robots" content="INDEX" />
              <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
              <meta content="animebizz" name="author" />
              <link rel="canonical" href="https://anime.bimabizz.my.id" />
              <link rel="Jadwal" href="https://anime.bimabizz.my.id/jadwal" />
              <link rel="Komik" href="https://anime.bimabizz.my.id/komik" />
          </Helmet>
      </>
    <div className=''>
      <h1 className='text-2xl font-bold text-red-600' style={{color: localStorage.getItem('Tema')}}>Home Dashboard</h1>
      <hr className='border-red-600 my-2' style={{borderColor: localStorage.getItem('Tema')}}/>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
        <div className='flex flex-col border border-red-600 p-3 rounded-md space-y-3 group hover:shadow-md hover:shadow-red-600 transition-shadow duration-500' onClick={() => navigate('/dashboard/anime-saya')}
        style={{boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`, borderColor: localStorage.getItem('Tema')}}
        >
            <div className='w-full flex justify-between items-center'>
                <HiVideoCamera className='text-red-600 text-3xl' style={{color: localStorage.getItem('Tema')}}/>
                <h1 className='text-red-600 text-xl px-2' style={{color: localStorage.getItem('Tema')}}>{anime.length}</h1>
            </div>
            <h1 className='dark:text-slate-300'>Jumlah Stok Anime saya</h1>
        </div>
        <div className='flex flex-col border border-red-600 p-3 rounded-md space-y-3 group hover:shadow-md hover:shadow-red-600 transition-shadow duration-500'  onClick={() => navigate('/dashboard/komik-saya')}
        style={{boxShadow: `0 5px 10px ${localStorage.getItem('Tema')}`, borderColor: localStorage.getItem('Tema')}}
        >
            <div className='w-full flex justify-between items-center'>
                <HiBookOpen className='text-red-600 text-3xl' style={{color: localStorage.getItem('Tema')}}/>
                <h1 className='text-red-600 text-xl px-2' style={{color: localStorage.getItem('Tema')}}>{komik.length}</h1>
            </div>
            <h1 className='dark:text-slate-300'>Jumlah Stok Komik saya</h1>
        </div>
      </div>
    </div>
    </>
  )
}

export default HomeDashboard