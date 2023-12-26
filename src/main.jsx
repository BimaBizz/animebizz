import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Anime from './route/Anime.jsx';
import DetailsAnime from './route/DetailsAnime.jsx';
import Jadwal from './route/Jadwal.jsx';
import AllEpisode from './route/AllEpisode.jsx'
import ErrorPage from './ErrorPage.jsx';
import Komik from './komik.jsx';
import Homekomik from './route_komik/komik.jsx'
import DetailKomik from './route_komik/DetailKomik.jsx';
import BacaKomik from './route_komik/BacaKomik.jsx';
import Login from './component/login.jsx';
import Dashboard from './Dashboard.jsx';
import AnimeSaya from './dashboard_route/AnimeSaya.jsx';
import KomikSaya from './dashboard_route/KomikSaya.jsx';
import HomeDashboard from './dashboard_route/HomeDashboard.jsx';
import TemaSaya from './dashboard_route/TemaSaya.jsx';
import ListAnime from './route/ListAnime.jsx'
import { Navigate } from 'react-router-dom';

const userTokenExists = localStorage.getItem('user') && localStorage.getItem('token');

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Anime />
      },
      {
        path: "anime/:slug",
        element: <DetailsAnime />
      },
      {
        path: "/jadwal",
        element: <Jadwal/>
      },
      {
        path: "/allepisode/:slug",
        element: <AllEpisode/>
      },
      {
        path: "/list-anime",
        element: <ListAnime/>
      }
    ]
  },
  {
    path: "/komik",
    element: <Komik />,
    children: [
      {
        index: true,
        element: <Homekomik />
      },
      {
        path: ":slug",
        element: <DetailKomik />
      },
      {
        path: "baca-komik/:slug",
        element: <BacaKomik />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: userTokenExists ? <Dashboard /> : <Navigate to="/login" replace />,
    children: [
      {
        index: true,
        element: <HomeDashboard />
      },
      {
        path: "anime-saya",
        element: <AnimeSaya />
      },
      {
        path: "komik-saya",
        element: <KomikSaya />
      },
      {
        path: "tema-saya",
        element: <TemaSaya />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='font-poppins flex justify-center'>
      <div className='w-full max-w-[1366px]'>
        <RouterProvider router={router} />
      </div>
    </div>
  </React.StrictMode>,
)
