import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { AnimeCards } from './card';
import { Anime } from '../../../types/anime';
import { useNavigate } from 'react-router-dom';

const Animes = () => {
  const navigate = useNavigate();

  const [animes, setAnimes] = useState<Anime[]>([
    // {
    //   ID: '20939-209-32809249-32323',
    //   Title: 'Hello Friends',
    //   Synopsis:
    //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi blanditiis accusamus qui voluptate voluptas aspernatur maxime velit dolorum veritatis debitis, aliquam explicabo delectus rem. Unde repellat culpa tenetur quam rem.',
    //   ReleaseDate: new Date('2023-20-12')
    // }
  ])
  const fetchAnimes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/anime/", { withCredentials: true })
      setAnimes(response.data.data)
      console.log("fetch animes success")
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        navigate("/login");
      }
      console.error(error)
    }

  }

  useEffect(() => {
    fetchAnimes()
  }, [])

  return (
    <div className="mt-5 flex-col max-w-screen pb-[20vh] min-h-screen flex items-center ml-5">
      <p className="text-center mb-7 text-2xl font-bold">Anime Watchlist</p>
      <div className='flex w-[80vw] mb-3 justify-start'>
        <button onClick={() => navigate('/add-anime')} className='px-2 py-1 justify-end bg-slate-300'>
          + Add anime
        </button>
      </div>

      <div className="flex flex-col gap-5 w-[80vw]">
        {animes.slice().reverse().map((anime, index) => (
          <AnimeCards
            key={index}
            anime={anime}
          />
        ))}
      </div>
    </div>
  );
};

export { Animes };
