import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-800">
        <div className="w-fit space-y-3">
            <h1 className="w-full text-center text-5xl font-bold text-red-600"
            style={{color: localStorage.getItem('Tema')}}
            >Oops! || 404</h1>
            <p className="w-full text-center dark:text-slate-300">not found</p>
            <div className="w-full flex justify-center p-3">
                <button className="bg-red-600 text-white p-3 rounded-md"
                style={{backgroundColor: localStorage.getItem('Tema')}}
                onClick={() => {navigate('/')}}>Back to Home</button>
            </div>
        </div>
    </div>
  );
}