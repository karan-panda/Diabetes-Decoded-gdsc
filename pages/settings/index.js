import React, { useState, useEffect } from "react";
import { getAuth, updateEmail, updatePassword, updateProfile, onAuthStateChanged } from "firebase/auth"; 
import { app } from "../firebase";
import Sidenav from "../../components/sidenav"; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import React icons
import { AiOutlineSetting } from 'react-icons/ai'; // Import settings icon

const auth = getAuth(app);

export default function Settings() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    setEmail(user.email);
    setName(user.displayName || "");

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const user = auth.currentUser;
      if (email !== user.email) {
        await updateEmail(user, email);
        setSuccessMessage("Email updated successfully!");
      }
      if (password) {
        await updatePassword(user, password);
        setSuccessMessage("Password updated successfully!");
      }
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
        setSuccessMessage("Name updated successfully!");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex">
      <Sidenav />
      <div className="container mx-auto mt-10 px-4 flex-1">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center space-x-4">
              <AiOutlineSetting className="text-blue-500 animate-spin slow-spin" /> Settings
            </h2>
            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="input-hover">
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 input-hover"
                />
              </div>
              <div className="input-hover">
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 input-hover"
                />
              </div>
              <div className="input-hover relative">
                <label htmlFor="password" className="block mb-1">New Password</label>
                <input
                  placeholder="Password should be atleast 6 char"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 input-hover"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 focus:outline-none eye-button absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}
              <button type="submit" className="w-full bg-rose-900 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-200 button-hover">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
