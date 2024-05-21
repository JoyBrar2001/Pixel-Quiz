import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import GoogleLogo from '/Google Logo.png';
import WelcomeScreenPoster from '/Welcome Screen Poster.png';
import ImageLoader from '../Components/ImageLoader';
import { QuizNavbar } from '../Components';

const contest_id = 1;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const HomePage = () => {
  const navigate = useNavigate();

  const query = useQuery();

  // const [contestId, setContestId] = useState(query.get("contest_id"));
  const [territoryId, setTerritoryId] = useState('');

  // console.log(contestId);
  
  useEffect(() => {
    const setterTerritoryId = async () => {
      const territoryIdValue = query.get("territory_id");
      setTerritoryId(territoryIdValue);
    }
    setterTerritoryId();
  }, []);

  return (
    <div className="bg-white font-googleSans min-h-screen w-full flex flex-col justify-start items-center">
      <QuizNavbar />
      <header className='w-full py-2 gap-2 flex flex-col'>
        <div className='w-full max-w-2xl mx-auto'>
          <ImageLoader src={WelcomeScreenPoster} />
        </div>
      </header>
      <main>
        <div className='max-w-2xl px-4 mx-auto mt-6 text-center flex flex-col gap-0.5 justify-center items-center'>
          <img src={GoogleLogo} alt="" className='h-5 w-5 md:h-8 md:w-8' />
          <h2 className='font-semibold text-xl sm:text-2xl md:text-4xl mt-2'>Welcome to</h2>
          <h1 className='font-semibold text-2xl sm:text-3xl md:text-5xl -mt-0.5'>Pixel Quiz Challenge</h1>
          <p className='font-medium text-sm md:text-xl text-zinc-600 mt-3 leading-tight'>Play Pixel Quiz Challenge and win coupons and many more rewards...</p>
        </div>

        <div className='max-w-2xl px-4 mx-auto mt-10 text-center'>
        <p className='text-xs md:text-lg tracking-tight leading-tight text-zinc-500 text-left'>
          • You will get 15 seconds to answer each question.<br/>
          • Each question awards 50 points.<br/>
          •{" "}<span className='text-[#4285F4]'>You can attempt this quiz only once.</span>
          </p>
          <button
            onClick={() => navigate(`/quiz?territory_id=${territoryId}&contest_id=${contest_id}`)}
            className="bg-[#4285F4] rounded-full w-full mt-4 md:mt-8 shadow-md text-white py-4 md:py-6 font-medium sm:text-3xl"
          >
            Start Playing
          </button>
        </div>
      </main>
    </div>
  )
}

export default HomePage