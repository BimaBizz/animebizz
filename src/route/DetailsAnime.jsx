import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const DetailsAnime = () => {
    const navigate = useNavigate()
    const url = localStorage.getItem('param')
    const [Anime, setAnime] = useState({})
    const [loading, setLoading] = useState(true)
    const [baseUrl, setBaseUrl] = useState(`https://animev1.bimabizz.my.id/api/anime/${url}`)
    const [server, setServer] = useState('')

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`${baseUrl}`)
        const data = await response.json()
        setAnime(data.data)
        if (data.data.video_embed_links && data.data.video_embed_links.length > 0) {
          setServer(data.data.video_embed_links[0].link);
        }
        setLoading(false)
      }
      fetchData()
    },[baseUrl])

    const handleClick = (episodeLink) => {
        localStorage.setItem('urlAPI', episodeLink)
        const url = localStorage.getItem('urlAPI')
        const result = url.replace("http://animev1.bimabizz.my.id/api/anime/", "");
        localStorage.setItem('param', result);
        window.location.reload()
    }

  return (
    <>
    {loading ? (
    <div className='w-full h-full flex justify-center items-center'>
    <div className='loader'></div>
  </div>
    ) : (
    <>
    <h1 className='m-4 text-xl font-bold dark:text-slate-300'>{Anime.name}</h1>
    <div className='m-4 grid md:flex gap-4'>
      <iframe className='w-full md:w-1/2 aspect-video' src={server} allowFullScreen />
      <div className='md:w-1/2 w-full my-3 space-y-3'>
        <h1 className='bg-black w-full rounded-md p-3 text-white font-bold'>Jika Server error silakan gunakan server yang tersedia</h1>
        <h2 className='font-bold dark:text-slate-300'>Bloger</h2>
        <div className='grid grid-cols-2 gap-2'>
          {Anime.video_embed_links.map((resolution, index) => (
            <button key={index} className='text-white bg-red-600 py-2 px-4 rounded-md'
            style={{backgroundColor : localStorage.getItem('Tema')}}
            onClick={() => setServer(resolution.link)}>
              {resolution.resolution}
            </button>
          ))}
        </div>
        <h2 className='font-bold dark:text-slate-300'>Mirror</h2>
        <div className='grid grid-cols-2 gap-2'>
          {Anime.video_mirrors.map((mirror, index) => (
            <button key={index} className='text-white bg-red-600 py-2 px-4 rounded-md' 
            style={{backgroundColor : localStorage.getItem('Tema')}}
            onClick={() => setServer(mirror.link)}>
              {mirror.resolution}
            </button>
          ))}
        </div>
      </div>
    </div>
    <div className='m-4'>
        <h2 className='text-xl font-bold dark:text-slate-300'>Episode Lainnya</h2>
        <div className='flex gap-2 mt-2'>
        {Anime.episode_navigation.map((episode, index) => (
        <div key={index}>
          <button className='text-white bg-red-600 py-2 px-4 rounded-md flex items-center' 
          style={{backgroundColor : localStorage.getItem('Tema')}}
          onClick={handleClick.bind(this, episode.nav_link)}>{episode.nav_name}</button>
        </div>
        ))}
        </div>
    </div>
    <div className='m-4 block md:flex gap-4'>
        <div className='h-80 md:w-1/2 rounded-md overflow-hidden mb-4 md:mb-0'>
            <img src={Anime.thumbnail} alt={Anime.name} className='w-full h-full object-cover object-center'/>
        </div>
        <div className='w-full md:w-1/2 space-y-4'>
            <h1 className='text-2xl font-bold dark:text-slate-300'>Synopsis : </h1>
            <p className='dark:text-slate-300'>{Anime.synopsis}</p>
        </div>
    </div>
    </>
    )}
    </>
  )
}

export default DetailsAnime