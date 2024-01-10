import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="p-4 md:p-8 lg:p-10">
  <div className="mx-auto max-w-screen-xl text-center">
      <Link to="/" className="flex justify-center items-center text-2xl font-semibold text-bg dark:text-slate-300">
          ANIME<span className='text-red-600' style={{color: localStorage.getItem('Tema')}}>BIZZ.</span>  
      </Link>
      <p className="my-6 text-bg dark:text-slate-300">Tempat nonton Anime dan baca komik gratis terbaik dengan anime terupdate</p>
      <ul className="flex flex-wrap justify-center items-center mb-6 dark:text-slate-300">
          <li>
              <Link to="/" className="mr-4 hover:underline md:mr-6 ">Home</Link>
          </li>
          <li>
              <Link to="/jadwal" className="mr-4 hover:underline md:mr-6">Jadwal</Link>
          </li>
          <li>
              <Link to="/komik" className="mr-4 hover:underline md:mr-6 ">Komik</Link>
          </li>
      </ul>
      <span className="text-sm text-gray-500 sm:text-center dark:text-slate-300">© 2021-2022 <Link to="/" className="hover:underline">DILARANG ASAL COMOT.™</Link>. All Rights Reserved.</span>
  </div>
</footer>
  )
}

export default Footer