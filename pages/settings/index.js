import React, { useState, useEffect } from "react";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { app } from "../firebase";
import Sidenav from "../../components/sidenav"; // Assuming the correct path to your Sidenav component

const auth = getAuth(app);

export default function Settings() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch user data when the component mounts
    const user = auth.currentUser;
    setEmail(user.email);
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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex">
      <Sidenav /> {/* Assuming Sidenav is a component for the sidebar navigation */}
      <div className="container mx-auto mt-10 px-4 flex-1">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-1">New Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {successMessage && <p className="text-green-500">{successMessage}</p>}
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
