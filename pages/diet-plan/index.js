import React from 'react';
import Head from 'next/head';
import SearchNutrition from '../../components/SearchNutrition';
import ChatBot from '@/components/Chatbot';
import { FaAppleAlt, FaCarrot, FaLeaf, FaUtensils, FaBookMedical, FaCalendarAlt } from 'react-icons/fa';
import { GiMeal, GiCookingPot } from 'react-icons/gi';
import { MdOutlineRestaurantMenu, MdFoodBank } from 'react-icons/md';

export default function DietPlan() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <ChatBot />

      {/* Main Content */}
      <div>
        <div className="mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg mb-8">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="flex items-center justify-between flex-wrap">
                <div>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    Nutrition & Recipe Hub
                  </h1>
                  <p className="mt-2 text-lg text-emerald-100">
                    Discover diabetes-friendly meals and track your nutrition
                  </p>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                  <button className="bg-white text-emerald-700 px-4 py-2 rounded-lg shadow hover:bg-emerald-50 transition flex items-center">
                    <FaBookMedical className="mr-2" /> Nutrition Guide
                  </button>
                  <button className="bg-white text-emerald-700 px-4 py-2 rounded-lg shadow hover:bg-emerald-50 transition flex items-center">
                    <FaCalendarAlt className="mr-2" /> Meal Planner
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-emerald-500">
              <div className="flex items-center">
                <div className="bg-emerald-100 p-3 rounded-full mr-4">
                  <FaAppleAlt className="text-emerald-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Glycemic Index</h3>
                  <p className="text-sm text-gray-600">Food impact on blood sugar</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <GiMeal className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Meal Plans</h3>
                  <p className="text-sm text-gray-600">Weekly diabetes-friendly plans</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaUtensils className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Recipe Collection</h3>
                  <p className="text-sm text-gray-600">Curated healthy recipes</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <MdFoodBank className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Nutrition Tracker</h3>
                  <p className="text-sm text-gray-600">Log and monitor intake</p>
                </div>
              </div>
            </div>
          </div>

          {/* Nutrition Tips */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaLeaf className="text-emerald-500 mr-2" /> Diabetes Nutrition Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 bg-emerald-50">
                <h3 className="font-medium text-emerald-700 mb-2">Carb Counting</h3>
                <p className="text-sm text-gray-700">
                  Track carbohydrates to manage blood sugar levels. Aim for consistent carb intake at each meal.
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="font-medium text-blue-700 mb-2">Fiber Focus</h3>
                <p className="text-sm text-gray-700">
                  Choose high-fiber foods to slow sugar absorption. Aim for 25-30g of fiber daily.
                </p>
              </div>
              <div className="border rounded-lg p-4 bg-purple-50">
                <h3 className="font-medium text-purple-700 mb-2">Portion Control</h3>
                <p className="text-sm text-gray-700">
                  Use the plate method: ½ non-starchy vegetables, ¼ protein, ¼ carbs.
                </p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <GiCookingPot className="text-emerald-500 mr-2" /> Nutrition & Recipe Search
            </h2>
            <SearchNutrition />
          </div>
        </div>
      </div>
    </div>
  );
}
