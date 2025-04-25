"use client"

import { useState, useEffect } from "react"
import { getAuth, updateEmail, updatePassword, updateProfile, onAuthStateChanged } from "firebase/auth"
import { app } from "../../lib/firebase"

import {
  FaEye,
  FaEyeSlash,
  FaBell,
  FaUser,
  FaLock,
  FaClipboardList,
  FaChartLine,
  FaLanguage,
  FaMoon,
  FaSun,
} from "react-icons/fa"
import { AiOutlineSetting, AiOutlineSync, AiOutlineAppstore } from "react-icons/ai"
import { BiSolidFoodMenu } from "react-icons/bi"
import { GiWeightScale } from "react-icons/gi"
import { MdOutlineSecurity, MdOutlinePrivacyTip, MdConnectedTv } from "react-icons/md"

export default function Settings() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [darkMode, setDarkMode] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState({
    dailyReminders: true,
    weeklyReports: true,
    healthAlerts: true,
    appUpdates: false,
  })
  const [healthGoals, setHealthGoals] = useState({
    dailySteps: 10000,
    targetWeight: 75,
    glucoseTarget: 100,
    insulinReminders: true,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);
        setName(user.displayName || "");
      }
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setName(user.displayName || "");
        }
      });
      return () => unsubscribe();
    }
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    try {
      const user = auth.currentUser

      if (!user) {
        setError("No user logged in")
        return
      }

      const updates = []

      if (email !== user.email) {
        await updateEmail(user, email)
        updates.push("Email")
      }

      if (password) {
        await updatePassword(user, password)
        updates.push("Password")
        setPassword("") // Clear password after update
      }

      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name })
        updates.push("Name")
      }

      if (updates.length > 0) {
        setSuccessMessage(`${updates.join(", ")} updated successfully!`)
      } else {
        setSuccessMessage("No changes to update")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleNotificationChange = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  const handleHealthGoalChange = (e) => {
    const { name, value, type, checked } = e.target
    setHealthGoals((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : Number.parseFloat(value),
    }))
  }

  return (
    <div>
      <div className="container px-4 py-8 flex-1">
        <div className="max-w-5xl mx-auto">
          <div className={`mb-8 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md p-6`}>
            <h1 className="text-3xl font-bold mb-6 flex items-center">
              <AiOutlineSetting className={`mr-3 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
              Settings
            </h1>

            {/* Settings Navigation */}
            <div className="flex mb-8 overflow-x-auto space-x-2 pb-2">
              {[
                { id: "profile", label: "Profile", icon: <FaUser /> },
                { id: "notifications", label: "Notifications", icon: <FaBell /> },
                { id: "healthGoals", label: "Health Goals", icon: <FaChartLine /> },
                { id: "security", label: "Security", icon: <MdOutlineSecurity /> },
                { id: "appearance", label: "Appearance", icon: <AiOutlineAppstore /> },
                { id: "devices", label: "Connected Devices", icon: <MdConnectedTv /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                    activeTab === tab.id
                      ? darkMode
                        ? "bg-blue-600 text-white"
                        : "bg-blue-500 text-white"
                      : darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                  } transition-colors`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Profile Settings */}
            {activeTab === "profile" && (
              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Update your personal information and how we can reach you
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block mb-2 font-medium">
                        <FaUser className="inline mr-2" /> Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-4 py-3 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="email" className="block mb-2 font-medium">
                        <FaClipboardList className="inline mr-2" /> Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                      />
                    </div>

                    <div className="group relative md:col-span-2">
                      <label htmlFor="password" className="block mb-2 font-medium">
                        <FaLock className="inline mr-2" /> New Password
                      </label>
                      <div className="relative">
                        <input
                          placeholder="Password should be at least 6 characters"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full px-4 py-3 border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-12`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 focus:outline-none"
                        >
                          {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Leave blank if you don&apos;t want to change your password
                      </p>
                    </div>
                  </div>
                </div>

                {error && <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">{error}</div>}
                {successMessage && (
                  <div className="p-4 border border-green-200 bg-green-50 text-green-600 rounded-lg">
                    {successMessage}
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-lg ${
                      darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-rose-900 hover:bg-rose-800"
                    } text-white font-medium transition-colors flex items-center`}
                  >
                    <AiOutlineSync className="mr-2" /> Update Profile
                  </button>
                </div>
              </form>
            )}

            {/* Notifications Settings */}
            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div className="p-6 border rounded-lg bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30">
                  <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Manage how and when you receive notifications
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        id: "dailyReminders",
                        label: "Daily Health Reminders",
                        description: "Receive daily reminders to log your glucose, meals, and medication",
                      },
                      {
                        id: "weeklyReports",
                        label: "Weekly Health Reports",
                        description: "Get a summary of your health metrics every week",
                      },
                      {
                        id: "healthAlerts",
                        label: "Health Alerts",
                        description: "Receive alerts when your readings are outside your target range",
                      },
                      {
                        id: "appUpdates",
                        label: "App Updates & News",
                        description: "Stay informed about new features and diabetes research",
                      },
                    ].map((setting) => (
                      <div
                        key={setting.id}
                        className={`flex items-start p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} border`}
                      >
                        <label className="flex items-center cursor-pointer w-full">
                          <div className="relative inline-block w-12 mr-4 align-middle select-none">
                            <input
                              type="checkbox"
                              checked={notificationSettings[setting.id]}
                              onChange={() => handleNotificationChange(setting.id)}
                              className="opacity-0 w-0 h-0 absolute"
                            />
                            <span
                              className={`toggle-dot absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${
                                notificationSettings[setting.id]
                                  ? "transform translate-x-6 border-green-500"
                                  : "border-gray-400"
                              }`}
                            ></span>
                            <span
                              className={`block overflow-hidden h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                notificationSettings[setting.id] ? "bg-green-500" : "bg-gray-300"
                              }`}
                            ></span>
                          </div>
                          <div>
                            <span className="font-medium block">{setting.label}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSuccessMessage("Notification settings saved successfully!")}
                    className={`px-6 py-3 rounded-lg ${
                      darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-rose-900 hover:bg-rose-800"
                    } text-white font-medium transition-colors`}
                  >
                    Save Notification Settings
                  </button>
                </div>
              </div>
            )}

            {/* Health Goals Settings */}
            {activeTab === "healthGoals" && (
              <div className="space-y-6">
                <div className="p-6 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30">
                  <h2 className="text-xl font-semibold mb-4">Health Goals</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Set personal targets to help manage your diabetes
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-medium" htmlFor="dailySteps">
                        <FaChartLine className="inline mr-2" /> Daily Steps Target
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          id="dailySteps"
                          name="dailySteps"
                          min="1000"
                          max="20000"
                          step="500"
                          value={healthGoals.dailySteps}
                          onChange={handleHealthGoalChange}
                          className="w-full"
                        />
                        <span className="ml-3 w-16 text-center">{healthGoals.dailySteps.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 font-medium" htmlFor="targetWeight">
                        <GiWeightScale className="inline mr-2" /> Target Weight (kg)
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          id="targetWeight"
                          name="targetWeight"
                          min="40"
                          max="150"
                          step="0.5"
                          value={healthGoals.targetWeight}
                          onChange={handleHealthGoalChange}
                          className="w-full"
                        />
                        <span className="ml-3 w-16 text-center">{healthGoals.targetWeight}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 font-medium" htmlFor="glucoseTarget">
                        <BiSolidFoodMenu className="inline mr-2" /> Target Glucose (mg/dL)
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          id="glucoseTarget"
                          name="glucoseTarget"
                          min="70"
                          max="180"
                          step="1"
                          value={healthGoals.glucoseTarget}
                          onChange={handleHealthGoalChange}
                          className="w-full"
                        />
                        <span className="ml-3 w-16 text-center">{healthGoals.glucoseTarget}</span>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <div className="relative inline-block w-12 mr-4 align-middle select-none">
                          <input
                            type="checkbox"
                            id="insulinReminders"
                            name="insulinReminders"
                            checked={healthGoals.insulinReminders}
                            onChange={handleHealthGoalChange}
                            className="opacity-0 w-0 h-0 absolute"
                          />
                          <span
                            className={`toggle-dot absolute block w-6 h-6 rounded-full bg-white border-2 appearance-none cursor-pointer transition-transform duration-200 ease-in-out ${
                              healthGoals.insulinReminders
                                ? "transform translate-x-6 border-green-500"
                                : "border-gray-400"
                            }`}
                          ></span>
                          <span
                            className={`block overflow-hidden h-6 rounded-full transition-colors duration-200 ease-in-out ${
                              healthGoals.insulinReminders ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></span>
                        </div>
                        <span className="font-medium">Insulin Reminders</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setSuccessMessage("Health goals saved successfully!")}
                    className={`px-6 py-3 rounded-lg ${
                      darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-rose-900 hover:bg-rose-800"
                    } text-white font-medium transition-colors`}
                  >
                    Save Health Goals
                  </button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="p-6 border rounded-lg bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/30 dark:to-amber-900/30">
                  <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Manage your account security and privacy
                  </p>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} border`}>
                      <h3 className="font-medium mb-2 flex items-center">
                        <MdOutlineSecurity className="mr-2" /> Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <button className={`px-4 py-2 rounded ${darkMode ? "bg-blue-600" : "bg-blue-500"} text-white`}>
                        Enable 2FA
                      </button>
                    </div>

                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} border`}>
                      <h3 className="font-medium mb-2 flex items-center">
                        <MdOutlinePrivacyTip className="mr-2" /> Privacy Settings
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Control how your data is used and shared
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                          <span className="ml-2 text-sm">Share anonymized data for research</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" defaultChecked />
                          <span className="ml-2 text-sm">Allow healthcare provider access</span>
                        </label>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} border`}>
                      <h3 className="font-medium mb-2 flex items-center">
                        <FaLock className="mr-2" /> Account Sessions
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage your active sessions</p>
                      <button className="px-4 py-2 rounded bg-red-500 text-white">Sign Out All Devices</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div className="p-6 border rounded-lg bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30">
                  <h2 className="text-xl font-semibold mb-4">Appearance Settings</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Customize how the app looks</p>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} border`}>
                      <h3 className="font-medium mb-4 flex items-center">Theme Mode</h3>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => setDarkMode(false)}
                          className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center ${
                            !darkMode ? "border-blue-500 bg-blue-50" : "border-gray-300"
                          }`}
                        >
                          <FaSun className="text-2xl mb-2 text-yellow-500" />
                          <span>Light Mode</span>
                        </button>

                        <button
                          onClick={() => setDarkMode(true)}
                          className={`flex-1 p-4 rounded-lg border-2 flex flex-col items-center ${
                            darkMode ? "border-blue-500 bg-blue-900/20" : "border-gray-300"
                          }`}
                        >
                          <FaMoon className="text-2xl mb-2 text-indigo-400" />
                          <span>Dark Mode</span>
                        </button>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} border`}>
                      <h3 className="font-medium mb-4 flex items-center">
                        <FaLanguage className="mr-2" /> Language
                      </h3>
                      <select
                        className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Chinese</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Connected Devices */}
            {activeTab === "devices" && (
              <div className="space-y-6">
                <div className="p-6 border rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30">
                  <h2 className="text-xl font-semibold mb-4">Connected Devices</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Manage devices that sync with your account
                  </p>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} border`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Glucose Monitor XG-2000</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Last synced: Today, 2:30 PM</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700">Disconnect</button>
                      </div>
                    </div>

                    <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} border`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">FitBit Versa 3</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Last synced: Yesterday, 8:15 PM</p>
                        </div>
                        <button className="text-red-500 hover:text-red-700">Disconnect</button>
                      </div>
                    </div>

                    <button
                      className={`w-full p-3 border-2 border-dashed text-center rounded-lg ${
                        darkMode ? "border-gray-700 text-gray-400" : "border-gray-300 text-gray-500"
                      } hover:text-blue-500 hover:border-blue-500 transition-colors`}
                    >
                      + Connect New Device
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

