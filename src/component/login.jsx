import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import BgWallpaper from '../assets/wallpaper_login.jpg';
import { auth, signInWithGooglePopup } from './Firebase';  // Impor objek 'auth' dari Firebase.jsx
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa6";

const login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordUlang, setPasswordUlang] = useState('');
  const [adaAkun, setAdaAkun] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!adaAkun) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/')
        window.location.reload('/')
      } else {
        if (password === passwordUlang) {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          localStorage.setItem('token', user.accessToken);
          localStorage.setItem('user', JSON.stringify(user));
          navigate('/')
          window.location.reload('/')
        } else {
          alert('Password tidak sama ulangi lagi!')
        }
      }
    } catch (error) {
      console.error(error.code, error.message);
      alert(`User Tidak ditemukan`);
    }
  };

  const loginGoole = async () => {
    const userCredential = await signInWithGooglePopup();
    const user = userCredential.user;
    localStorage.setItem('token', user.accessToken);
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/')
    window.location.reload('/')
  }

  return (
    <>
    <Helmet>
              <title>ANIMEBIZZ | LOGIN</title>
              <meta name="description" content="Login ke animebizz untuk mendapatkan fitur menarik" />
              <meta name="robots" content="INDEX" />
              <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
              <meta content="animebizz" name="author" />
              <link rel="canonical" href="https://anime.bimabizz.my.id" />
    </Helmet>
    <div className='flex flex-col justify-center place-items-center w-full min-h-screen bg-cover bg-center bg-no-repeat p-4' style={{backgroundImage: `url(${BgWallpaper})`}}>
        <div className='p-3 bg-white/50 backdrop-blur-sm rounded-md'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-items-center max-w-xl'>
                <h1 className='text-2xl font-bold uppercase'>Login to ANIMEBIZZ</h1>
                <p className='text-sm text-center'>ANIMEBIZZ Nonton Online Streaming Anime dan Baca Komik Subtitle Indonesia Kualitas Tinggi tersedia 240P 360P 480P 720P MP4 size irit</p>
                <div className='my-5 space-y-2 flex justify-items-center flex-col items-center w-full'>
                    <input type="email" 
                    placeholder='email' 
                    value={email} 
                    required 
                    onChange={(e) => setEmail(e.target.value)}
                    className='p-2 rounded-md w-full max-w-md outline-none'/>
                    <input type="password" 
                    placeholder='password' 
                    value={password} 
                    required 
                    onChange={(e) => setPassword(e.target.value)}
                    className='p-2 rounded-md w-full max-w-md outline-none'/>
                    {adaAkun ? (
                      <input type="password" 
                      placeholder='ulangi password' 
                      value={passwordUlang} 
                      required 
                      onChange={(e) => setPasswordUlang(e.target.value)}
                      className='p-2 rounded-md w-full max-w-md outline-none'/>
                    ):(
                      ''
                    )}
                </div>
                <button className='py-2 px-4 bg-red-600 text-white w-fit rounded-md' style={{backgroundColor: localStorage.getItem('Tema')}} type='submit'>{adaAkun ? 'Daftar' : 'Login'}</button>
            </form>
                <button className='py-2 text-sx mt-5 w-full' onClick={() => setAdaAkun(!adaAkun)}>{adaAkun ? 'Sudah' : 'Belum'} punya akun?</button>
        </div>
        <div className='flex items-center justify-center p-3 mt-5 w-full'>
            <button className='px-4 py-2 flex items-center rounded-full bg-red-600 text-white justify-center' style={{backgroundColor: localStorage.getItem('Tema')}} onClick={loginGoole}>
            <FaGoogle className='mr-2'/> Login Google
            </button>
        </div>
    </div>
    </>
  )
}

export default login