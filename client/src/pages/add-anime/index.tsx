import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';


const AddAnime = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/anime/', {
        Title: title,
        ReleaseDate: date,
        Synopsis: synopsis,
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      console.log(response)
      if (response.status == 200) {
        alert('Anime added')
        navigate('/')
      }else{
        console.log("masuk")
      }
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) { 
        navigate("/login"); 
      }
      console.error(error);
    }
  };

  return (
    <div className="mt-5 flex-col max-w-screen pb-[20vh] min-h-screen flex items-center">
      <h1 className="text-center">Add Anime</h1>
      <div className='w-[80vw] space-y-4'>
        <div className="flex flex-col form-group w-full">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            className="p-2 border form-control"
            placeholder="Insert anime title ..."
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col form-group w-full">
          <label htmlFor="synopsis">Synopsis *</label>
          <textarea
            id="synopsis"
            className="p-2 border form-control"
            placeholder="Insert anime synopsis ..."
            required
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-[20vw] form-group">
          <label htmlFor="date">Date *</label>
          <input
            id="date"
            type="date"
            className="p-2 border form-control"
            placeholder="Insert anime release date ..."
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit} className="bg-slate-300 mr-2 px-3 py-2 disabled:opacity-50 transition-all" disabled={!title || !synopsis || !date}>
          Submit
        </button>
        <button onClick={() => navigate("/")} className="border-slate-300 border px-3 py-2 disabled:opacity-50">
          cancel
        </button>
      </div>
    </div>
  );
};

export { AddAnime };
