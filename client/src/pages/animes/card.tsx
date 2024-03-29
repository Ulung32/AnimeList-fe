import { Anime } from '../../../types/anime';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface AnimeCardProps {
  anime: Anime
}

export const AnimeCards = ({ anime }: AnimeCardProps) => {
  const navigate = useNavigate();
  const releaseDate = new Date(anime.ReleaseDate.valueOf()) 

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/anime/${anime.ID}`, {
        withCredentials: true
      })
      if (response.status == 200) {
        alert('Anime deleted')
        window.location.reload();
      }
    } catch (error) {
      if ((error as AxiosError).response?.status == 404) {
        alert('anime not found')
        navigate('/')
      }
      if ((error as AxiosError).response?.status === 401) { // Type assert error as AxiosError
        navigate("/login"); // Redirect to the login page
      }
      console.error(error)
    }
  };

  return (
    <div className="border-dashed p-3 hover:shadow-md transition-all w-full border-2">
      <div className="flex flex-row mb-3 items-center justify-between">
        <h1 className="w-full font-bold">
          {anime.Title}
        </h1>
        <div className="flex flex-row gap-5">
          <button onClick={() => navigate(`/edit-anime/${anime.ID}`)} className="px-3 py-1 bg-slate-300">
            Edit
          </button>
          <button onClick={handleDelete} className="px-3 py-1 text-white bg-red-600">
            Delete
          </button>
        </div>
      </div>

      <div className="flex flex-row justify-between gap-4">
        <h2 className="text-black">
          {anime.Synopsis}
        </h2>
        <p className="text-slate-400 min-w-fit">
          {releaseDate.toLocaleDateString()}
        </p>
      </div>

    </div>
  )
};
