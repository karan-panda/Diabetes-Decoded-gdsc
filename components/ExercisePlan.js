import { useState } from 'react';
import { FaSearch, FaExclamationCircle } from 'react-icons/fa';
import { PacmanLoader } from 'react-spinners';
import axios from 'axios';
import Card from './Card';
import { LinearProgress } from '@mui/material';

const SearchExercise = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(true);
  const [images, setImages] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setImages({}); // Reset images

    try {
      const response = await fetch(`/api/exercises?query=${query}`);
      if (!response.ok) throw new Error('Failed to fetch exercise data');
      const data = await response.json();
      setResults(data);

      // Fetch exercise images from Unsplash API for each exercise
      const imagePromises = data.map(async (item) => {
        const unsplashResponse = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: item.name,
            client_id: 'vxsiY9lmI5yb2zi3c0E3CY6XuvwWkGpSHLOB_s7VxhE',
            per_page: 1,
            orientation: 'landscape',
          }
        });
        return {
          name: item.name,
          image: unsplashResponse.data.results[0]?.urls.small || ''
        };
      });

      const imageResults = await Promise.all(imagePromises);
      const imageMap = imageResults.reduce((acc, { name, image }) => {
        acc[name] = image;
        return acc;
      }, {});
      
      setImages(imageMap);
      setSearched(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const defaultContent = (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-xl font-semibold mb-6">Search for an exercise to get detailed information and images.</h3>
      <div className="w-full md:w-3/4 flex justify-center items-center">
        <img src="https://assets.clevelandclinic.org/transform/26568096-7fcc-4713-898d-ca1ed6c84895/exerciseHowOften-944015592-770x533-1_jpg" alt="Exercise" className="rounded-md max-w-xs mr-8" />
        <div>
          <h2 className="text-xl font-semibold mb-4">Finding the Right Exercise</h2>
          <p className="mb-4">Explore various exercises and find the ones that suit your fitness goals. From strength training to cardio, discover workouts that keep you motivated and fit.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex justify-center items-center">
          <div className="relative w-3/4 md:w-1/2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for an exercise"
              className="border border-gray-300 p-3 pl-10 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="absolute left-3 top-3 text-gray-400">
              <FaSearch className="h-6 w-6" />
            </span>
            <button type="submit" className="absolute right-1 top-1 bottom-1 bg-emerald-500 text-white px-4 rounded-md hover:bg-emerald-600 focus:outline-none">
              Search
            </button>
          </div>
        </div>
      </form>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center m-auto p-4">
          <PacmanLoader size={60} color={"#34D399"} loading={loading} />
        </div>
      )}

      {error && (
        <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <FaExclamationCircle className="mr-2 h-5 w-5 text-red-500" />
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {searched ? (
        defaultContent
      ) : null}

      <div className="flex flex-wrap gap-4 mt-4">
        <div className='w-full'>
          {results.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {results.map((item, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/5 p-2">
                  <div className="border border-gray-200 p-4 rounded-md">
                    {images[item.name] && (
                      <img src={images[item.name]} alt={item.name} className="w-full h-auto mb-4 rounded-md" />
                    )}
                    <h2 className="text-lg font-semibold text-emerald-700">{item.name}</h2>
                    <p><strong>Type:</strong> {item.type}</p>
                    <p><strong>Muscle Group:</strong> {item.muscle_group}</p>
                    <p><strong>Equipment:</strong> {item.equipment}</p>
                    <p><strong>Difficulty:</strong> {item.difficulty}</p>
                    <p><strong>Instructions:</strong>{item.instructions}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default SearchExercise;
