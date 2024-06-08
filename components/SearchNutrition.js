import { useState } from 'react';
import { FaSearch, FaExclamationCircle, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { PacmanLoader } from 'react-spinners';
import axios from 'axios';
import Card from './Card';
import { LinearProgress } from '@mui/material';

const SearchNutrition = () => {
  const [query, setQuery] = useState('');
  const [results1, setResults1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [foodImage, setFoodImage] = useState(null);
  const [searched, setSearched] = useState(true);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response1 = await fetch(`/api/nutrition?query=${query}`);
      if (!response1.ok) throw new Error('Failed to fetch nutrition data');
      const data1 = await response1.json();
      setResults1(data1);

      const response2 = await fetch(`/api/recipes?query=${query}`);
      if (!response2.ok) throw new Error('Failed to fetch recipe data');
      const data2 = await response2.json();
      setResults2(data2);

      // Fetch food images from Unsplash API
      const unsplashResponse = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=vxsiY9lmI5yb2zi3c0E3CY6XuvwWkGpSHLOB_s7VxhE&height=600`);
      setFoodImage(unsplashResponse.data.results[0]);
      setSearched(false);
      console.log("Searched:", searched);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const safeValues = {
    calories: 400,
    fat_total_g: 10,
    protein_g: 20,
    carbohydrates_total_g: 60,
    fiber_g: 5,
    sugar_g: 5,
    cholesterol_mg: 50,
    sodium_mg: 500
  };

  const determineColor = (value, safeValue) => {
    return value > safeValue ? 'error' : 'primary';
  };

  const ListItem = ({ title, children }) => (
    <li className="border border-gray-200 p-4 rounded-md">
      <p className="text-xl font-semibold text-emerald-700">{title}</p>
      {children}
    </li>
  );

  const isHigh = (item) => {
    return (
      item.calories > safeValues.calories ||
      item.fat_total_g > safeValues.fat_total_g ||
      item.protein_g > safeValues.protein_g ||
      item.carbohydrates_total_g > safeValues.carbohydrates_total_g ||
      item.fiber_g > safeValues.fiber_g ||
      item.sugar_g > safeValues.sugar_g ||
      item.cholesterol_mg > safeValues.cholesterol_mg ||
      item.sodium_mg > safeValues.sodium_mg
    );
  };

  const defaultContent = (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-xl font-semibold mb-6">Search for a food item to get nutrition information and recipes.</h3>
      <div className="w-full md:w-3/4 flex justify-center items-center">
        <img src="https://img.freepik.com/premium-vector/flat-illustration-world-vegetarian-day_23-2149612295.jpg" alt="World Vegetarian Day" className="rounded-md max-w-xs mr-8" />
        <div>
          <h2 className="text-xl font-semibold mb-4">Navigating Diabetes, Food, & Nutrition</h2>
          <p className="mb-4">Explore how to navigate nutrition while living with diabetes—because when you eat right, you feel right.</p>
          <p className="mb-4">Eating Right Doesn't Have to Be Boring.</p>
          <p className="mb-4">Eating well with diabetes doesn't mean giving up your favorite foods, it's about finding the balance between keeping the flavors you love and incorporating the nutrients you need to live well with diabetes.</p>
          <p className="mb-4">Simple swaps such as opting for the low-fat versions of cheeses and dressings, choosing lean meats, and using natural sweetners will all help you meet your health goals—and they'll taste great too!</p>
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
              placeholder="Search for a food item"
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

      <div className="flex justify-between mt-4">
        <div className='w-1/2'>
          {results1.length > 0 && (
            <ul className="space-y-4">
              {results1.map((item, index) => (

                <ListItem key={index}>
                  <div className="bg-emerald-500 p-2 rounded-md">
                    <h2 className="text-lg font-semibold text-white">{item.name}</h2>
                  </div>
                  {isHigh(item) ? (
                    <div className="flex items-center bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mt-2" role="alert">
                      <FaExclamationTriangle className="mr-2 h-5 w-5 text-yellow-500" />
                      <span className="block sm:inline"><strong>Caution: </strong>Excessive consumption may impact health.</span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-2" role="alert">
                      <FaCheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      <span className="block sm:inline">This food is healthy.</span>
                    </div>
                  )}
                  <div className="m-3">
                    <p><strong>Calories:</strong> {item.calories}</p>
                    <LinearProgress
                      className="mt-2"
                      variant="determinate"
                      value={item.calories}
                      color={determineColor(item.calories, safeValues.calories)}
                    />
                  </div>
                  <div className="m-3">
                    <p><strong>Fat:</strong> {item.fat_total_g}</p>
                    <LinearProgress
                      className="mt-2"
                      variant="determinate"
                      value={item.fat_total_g}
                      color={determineColor(item.fat_total_g, safeValues.fat_total_g)}
                    />
                  </div>
                  <div className="m-3">
                    <p><strong>Protein:</strong> {item.protein_g}</p>
                    <LinearProgress
                      className="mt-2"
                      variant="determinate"
                      value={item.protein_g}
                      color={determineColor(item.protein_g, safeValues.protein_g)}
                    />
                  </div>
                  <div className="m-3">
                    <p><strong>Carbohydrates:</strong> {item.carbohydrates_total_g}</p>
                    <LinearProgress
                      className="mt-2"
                      variant="determinate"
                      value={item.carbohydrates_total_g}
                      color={determineColor(item.carbohydrates_total_g, safeValues.carbohydrates_total_g)}
                    />
                  </div>
                  <div className="m-3">
                    <p><strong>Fiber:</strong> {item.fiber_g}</p>
                    <LinearProgress
                      className="mt-2"
                      variant="determinate"
                      value={item.fiber_g}
                      color={determineColor(item.fiber_g, safeValues.fiber_g)}
                    />
                  </div>
                  <div className="m-3">
                    <p><strong>Sugar:</strong> {item.sugar_g}</p>
                    <LinearProgress
                      className="mt-2"
                      variant="determinate"
                      value={item.sugar_g}
                      color={determineColor(item.sugar_g, safeValues.sugar_g)}
                    />
                  </div>
                  <div className="m-3">
                    <p><strong>Cholesterol:</strong> {item.cholesterol_mg}</p>
                    <LinearProgress
                      className="mt-2"
                      variant="determinate"
                      value={item.cholesterol_mg}
                      color={determineColor(item.cholesterol_mg, safeValues.cholesterol_mg)}
                    />
                  </div>
                  <div className="m-3">
                    <p><strong>Sodium:</strong> {item.sodium_mg}</p>
                    <LinearProgress
                      className="mt-2"
                      variant="determinate"
                      value={item.sodium_mg}
                      color={determineColor(item.sodium_mg, safeValues.sodium_mg)}
                    />
                  </div>
                </ListItem>
              ))}
            </ul>
          )}
        </div>
        <div className="w-1/2 flex justify-center items-center">
          {foodImage && foodImage.urls && (
            <img src={foodImage.urls.small} alt={foodImage.alt_description} className="rounded-md" />
          )}
        </div>
      </div>

      <div className="flex flex-wrap">
        {results2.length > 0 && results2.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>

    </div>
  );
};

export default SearchNutrition;