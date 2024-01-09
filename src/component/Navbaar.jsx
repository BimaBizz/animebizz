import React, { useState, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle, HiOutlineUser, HiOutlineAdjustments, HiOutlineLogout } from "react-icons/hi";

const Navbaar = () => {
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [userimage, setUserimage] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  // Cek apakah ada data user dan token di localStorage
  const userTokenExists = localStorage.getItem('user') && localStorage.getItem('token');
  const userDetail = localStorage.getItem('user');
  const parsedUserDetail = userDetail ? JSON.parse(userDetail) : null;

    useEffect(() => {
        if (parsedUserDetail && parsedUserDetail.providerData && parsedUserDetail.providerData.length > 0) {
            if(parsedUserDetail.providerData[0].displayName
                == null){
                const email = parsedUserDetail.providerData[0].email;
                setUserEmail(email);
            }else{
                const email = parsedUserDetail.providerData[0].displayName;
                const image = parsedUserDetail.providerData[0].photoURL;
                setUserEmail(email);
                setUserimage(image);
            }
        }
    }, [parsedUserDetail]);

  return (
    <>
      <nav className='sticky top-0 z-40 py-4 px-6 bg-red-600 shadow-md flex justify-between items-center text-white' style={{backgroundColor: localStorage.getItem('Tema')}}>
        <div className='md:flex items-center'>
          <Link to={'/'}>
            <h1 className='text-3xl font-bold'>
              ANIME<span className=''>BIZZ.</span>
            </h1>
          </Link>
          <input type='text' className='hidden ml-6 px-4 py-1 rounded-full' placeholder='search ...' />
        </div>
        <div className='flex gap-2 md:gap-4'>
          <button className='text-3xl h-auto w-auto md:hidden block' onClick={handleClick}>
            <HiMenu />
          </button>
          <ul className='hidden md:flex gap-4 items-center'>
            <li className='hover:underline hover:underline-offset-2'>
              <Link to='/' className='w-full h-full'>
                Home
              </Link>
            </li>
            <li className='hover:underline hover:underline-offset-2'>
              <Link to='/list-anime' className='w-full h-full'>
                List Anime
              </Link>
            </li>
            <li className='hover:underline hover:underline-offset-2'>
              <Link to='/jadwal' className='w-full h-full'>
                Jadwal
              </Link>
            </li>
            <li className='hover:underline hover:underline-offset-2'>
              <Link to='/komik' className='w-full h-full'>
                Komik
              </Link>
            </li>
          </ul>
          {userTokenExists ? (
            <>
          <button className='rounded-full h-8 w-8 bg-white text-red-600 text-2xl items-center flex justify-center'
          style={{color: localStorage.getItem('Tema')}}
          onClick={() => setOpenUser(!openUser)}>
            {userimage == null ? <HiOutlineUserCircle/> : <img src={userimage} className="w-full h-full rounded-full"/>}
          </button>
            {openUser ? (
                <div className='absolute right-5 top-[70px] bg-white/70 backdrop-blur-sm'>
                <ul className='text-red-600 p-2' style={{color: localStorage.getItem('Tema')}}>
                <li className=' py-1 px-3 flex justify-center items-center'><span className='mr-2'><HiOutlineUser /></span>{userEmail}</li>
                <li className=''>
                    <button className='px-3 py-1 w-full text-left flex items-center' onClick={() => navigate('/dashboard')}><span className='mr-2'><HiOutlineAdjustments /></span> Dashboard</button>
                </li>
                <li className=''>
                    <button className='px-3 py-1 w-full text-left flex items-center'
                    onClick={() => {
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        localStorage.removeItem('Tema');
                        localStorage.removeItem('DarkMode');
                        window.location.reload();
                    }}
                    ><span className='mr-2'><HiOutlineLogout /></span> LogOut</button>
                </li>
                </ul>
            </div> 
            ):(
                ''
            )}
            </>
          ) : (
            <button className='py-2 px-4 bg-white text-black rounded-md hover:cursor-pointer'>
              <Link to='/login' className='w-full h-full'>
                Login
              </Link>
            </button>
          )}
        </div>
      </nav>
      <div className={`sticky top-[68px] z-40 flex justify-between items-center text-slate-800 dark:text-slate-300 bg-white dark:bg-slate-800 ${open ? 'block' : 'hidden'}`}>
        <ul className='w-full'>
          <hr />
          <Link to='/' onClick={handleClick}>
            <li className='text-xl font-bold p-4'>Home</li>
          </Link>
          <hr className='border-red-600' style={{borderColor: localStorage.getItem('Tema')}}/>
          <Link to='/list-anime' onClick={handleClick}>
            <li className='text-xl font-bold p-4'>List Anime</li>
          </Link>
          <hr className='border-red-600' style={{borderColor: localStorage.getItem('Tema')}}/>
          <Link to='/jadwal' onClick={handleClick}>
            <li className='text-xl font-bold p-4'>Jadwal</li>
          </Link>
          <hr className='border-red-600' style={{borderColor: localStorage.getItem('Tema')}}/>
          <Link to='/komik' onClick={handleClick}>
            <li className='text-xl font-bold p-4'>Komik</li>
          </Link>
          <hr className='border-red-600' style={{borderColor: localStorage.getItem('Tema')}}/>
        </ul>
      </div>
    </>
  );
};

export default Navbaar;
