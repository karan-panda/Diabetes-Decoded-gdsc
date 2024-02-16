import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ProfileSettings = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <img src='/images/profile.png' className='rounded-full w-24 border-4 border-white mb-8' alt="Profile" />
      <div className='inline-block bg-white p-6 rounded-lg shadow-md'>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" className='border-2 border-gray-300 rounded-sm w-full py-2 px-3 mt-1' />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" id="email" className='border-2 border-gray-300 rounded-sm w-full py-2 px-3 mt-1' />
        </div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>

        <div className="flex items-center mb-4">
          <input 
            type={showPassword ? 'text' : 'password'} 
            id="password" 
            className='border-2 border-gray-300 rounded-sm w-full py-2 px-3 mt-1 ml-2' 
          />
          <button 
            onClick={togglePasswordVisibility} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-3 rounded ml-2"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        <div className="flex justify-center">
          <button className="bg-rose-700 hover:bg-rose-800 text-white font-bold py-2 px-4 rounded">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
