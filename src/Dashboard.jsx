import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { HiMenuAlt2, HiMenuAlt3, HiOutlineLogout, HiOutlineUserCircle, HiPlay, HiBookOpen, HiChartPie, HiColorSwatch, HiHome, HiChat } from "react-icons/hi";

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const dataUser = localStorage.getItem('user')
  const parsedDataUser = dataUser ? JSON.parse(dataUser) : null
  const userPhoto = parsedDataUser.providerData[0].photoURL
  const navigate = useNavigate()

  const handleClickAsside = () => {
    setOpen(!open)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('Tema')
    window.location.reload()
  }
  

  return (
    <>
    <button className='lg:hidden m-2 p-2 text-2xl bg-red-600 hover:text-white rounded-md' style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff'}} onClick={handleClickAsside}>
      <HiMenuAlt2/>
    </button>
    <aside className={`h-full bg-slate-100 dark:bg-slate-900 w-3/4 md:w-2/4 lg:w-1/4 absolute z-20 top-0 left-0 flex flex-col ${open ? '' : '-translate-x-full'} lg:translate-x-0 transition-all duration-300 p-2`}>
      <ul className='space-y-3'>
        <li className='w-full flex justify-end lg:hidden'>
          <button className='top-2 left-2 p-2 text-2xl text-red-600 bg-red-600 hover:text-white rounded-md'
          style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff'}}
          onClick={handleClickAsside}>
            <HiMenuAlt3/>
          </button>
        </li>
        <li className='w-full flex flex-col place-items-center space-y-2'>
          <div className='rounded-full overflow-hidden'>
            {userPhoto == null ? <HiOutlineUserCircle className='w-24 h-24 text-red-600' style={{color: localStorage.getItem('Tema')}}/> : <img src={userPhoto} className='w-24 h-24'/>}
          </div>
          <h1 className='text-xl lg:text-2xl font-semibold dark:text-slate-300'>{parsedDataUser.providerData[0].displayName}</h1>
          <p className='text-sm w-full text-center dark:text-slate-300'>{parsedDataUser.providerData[0].email}</p>
          <div className='w-full flex justify-center gap-2'>
          <button className='w-full flex items-center py-2 px-5 bg-red-600 text-white rounded-md' onClick={() => navigate('/')}
          style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff'}}
          >
            <HiHome className='mr-2'/>
            Home
          </button>
          <button className='w-full flex items-center py-2 px-5 bg-red-600 text-white rounded-md' onClick={handleLogout}
          style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff'}}
          >
            <HiOutlineLogout className='mr-2'/>
            Logout
          </button>
          </div>
        </li>
        <li>
          <hr className='border-red-600' style={{borderColor: localStorage.getItem('Tema')}}/>
        </li>
        <li onClick={handleClickAsside}>
          <Link to='/dashboard' className='flex items-center py-2 px-5 bg-red-600 hover:text-white rounded-md transition-colors duration-500'
          style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff'}}
          >
            <HiChartPie className='mr-2'/>
            Home Dashboard
          </Link>
        </li>
        <li onClick={handleClickAsside}>
          <Link to='/dashboard/anime-saya' className='flex items-center py-2 px-5 bg-red-600 hover:text-white rounded-md transition-colors duration-500'
          style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff'}}
          >
            <HiPlay className='mr-2'/>
            Anime Saya
          </Link>
        </li>
        <li onClick={handleClickAsside}>
          <Link to='/dashboard/komik-saya' className='flex items-center py-2 px-5 bg-red-600 hover:text-white rounded-md transition-colors duration-500'
          style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff'}}
          >
            <HiBookOpen className='mr-2'/>
            Komik Saya
          </Link>
        </li>
        <li onClick={handleClickAsside}>
          <Link to='/dashboard/tema-saya' className='flex items-center py-2 px-5 bg-red-600 hover:text-white rounded-md transition-colors duration-500'
          style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff'}}
          >
            <HiColorSwatch className='mr-2'/>
            Tema Saya
          </Link>
        </li>
        <li onClick={handleClickAsside}>
          <Link to='/dashboard/chat-diskusi' className='flex items-center py-2 px-5 bg-red-600 hover:text-white rounded-md transition-colors duration-500'
          style={{backgroundColor: localStorage.getItem('Tema'), color: '#fff'}}
          >
            <HiChat className='mr-2'/>
            Chat Diskusi
          </Link>
        </li>
      </ul>
    </aside>
    <div className='w-full lg:w-3/4 absolute top-[50px] lg:top-0 right-0 px-4 lg:py-2 dark:bg-slate-800 h-full'>
      <Outlet/>
    </div>
    </>
  )
}

export default Dashboard