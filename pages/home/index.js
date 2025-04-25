"use client"

import React from "react";
import { useState, useEffect, useRef } from "react";
import Calendar from "../../components/Calendar";
import NewsComponent from "../../components/NewsComponent";
import Link from "next/link";
import { IoCheckmarkDoneCircle, IoInformationCircleOutline } from "react-icons/io5";
import { FaChartLine, FaCalendarCheck, FaNewspaper } from "react-icons/fa";
import Modal from "react-modal";
import Shepherd from "shepherd.js";
import "shepherd.js/dist/css/shepherd.css";
import ChatBot from "@/components/Chatbot";
import { 
  getCurrentUserDisplayName, 
  auth, 
  fetchTasks, 
  toggleTaskCompletion, 
  addTask, 
  getCompletedDates,
  calculateMaxStreak,
  storeCompletedDate,
  removeCompletedDate
} from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  FaAppleAlt,
  FaRunning,
  FaVial,
  FaHeartbeat,
  FaCarrot,
  FaDumbbell,
  FaWalking,
  FaBiking,
  FaLeaf,
  FaFish,
  FaBed,
  FaUtensils
} from "react-icons/fa";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function Home() {

  const taskIcons = [
    FaAppleAlt,   // Food/fruit
    FaCarrot,     // Food/vegetable
    FaFish,       // Food/protein
    FaUtensils,   // General food/meal
    FaRunning,    // Running/workout
    FaDumbbell,   // Strength/workout
    FaWalking,    // Walking/activity
    FaBiking,     // Cycling/activity
    FaHeartbeat,  // Heart/health
    FaLeaf,       // Healthy/natural
    FaVial,       // Medical/test
    FaBed         // Sleep/rest
  ];
  const taskColors = [
    "text-purple-600",
    "text-green-600",
    "text-blue-600",
    "text-red-500",
    "text-yellow-500",
    "text-pink-500",
    "text-orange-500",
    "text-teal-600",
    "text-indigo-600",
    "text-gray-700",
    "text-lime-600",
    "text-emerald-600",
    "text-cyan-600",
    "text-fuchsia-600",
    "text-rose-600"
  ];

  // Utility to get a random permutation of icons/colors
  function getRandomPermutation(arr, count) {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const [tasks, setTasks] = useState([]);
  const [iconsPermutation, setIconsPermutation] = useState([]);
  const [colorsPermutation, setColorsPermutation] = useState([]);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [addTaskError, setAddTaskError] = useState("");
  const [latestSteps, setLatestSteps] = useState(null);
  const [stepsLoading, setStepsLoading] = useState(true);
  const [maxStreak, setMaxStreak] = useState(0);

  // Fetch tasks from Firebase
  useEffect(() => {
    async function loadTasks() {
      const tasksFromDb = await fetchTasks();
      if (Array.isArray(tasksFromDb) && tasksFromDb.length > 0) {
        setTasks(tasksFromDb);
      } else {
        // Fallback to default tasks if none found in database
        setTasks([
          { id: 1, name: "Take blood glucose reading", checked: false },
          { id: 2, name: "Follow recommended diet plan", checked: false },
          { id: 3, name: "Complete 30 min exercise", checked: false },
        ]);
      }
    }
    
    loadTasks();
  }, []);
  
  // Update permutations when tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      setIconsPermutation(getRandomPermutation(taskIcons, tasks.length));
      setColorsPermutation(getRandomPermutation(taskColors, tasks.length));
    }
  }, [tasks]);

  // Add this to ensure we have default values
  useEffect(() => {
    // Initialize with empty arrays to prevent undefined access
    if (iconsPermutation.length === 0 && tasks.length > 0) {
      setIconsPermutation(getRandomPermutation(taskIcons, tasks.length));
    }
    if (colorsPermutation.length === 0 && tasks.length > 0) {
      setColorsPermutation(getRandomPermutation(taskColors, tasks.length));
    }
  }, [iconsPermutation, colorsPermutation, tasks]);

  const [allTasksCompleted, setAllTasksCompleted] = useState(false)
  const [showTourModal, setShowTourModal] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [userName, setUserName] = useState("user")

  // References for tour
  const calendarRef = useRef(null)
  const taskListRef = useRef(null)
  const newsComponentRef = useRef(null)
  const linksRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    setAllTasksCompleted(tasks.every((task) => task.checked))
  }, [tasks])

  useEffect(() => {
    // Check if user has already seen the tour
    const hasSeenTour = localStorage.getItem("dashboardTourSeen") === "true";
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        setShowTourModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowTourModal(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        setUserName(user.displayName);
      } else {
        setUserName("user");
      }
    });
    return () => unsubscribe();
  }, []);
  
  // Load the maximum streak
  useEffect(() => {
    async function loadMaxStreak() {
      try {
        const streak = await calculateMaxStreak();
        setMaxStreak(streak || 0);
      } catch (error) {
        console.error("Error calculating maximum streak:", error);
      }
    }
    
    loadMaxStreak();
  }, []);

  const toggleCheckbox = async (taskId) => {
    try {
      // Check if this action would untick the last completed task
      const isUnticking = tasks.find(task => task.id === taskId)?.checked === true;
      const currentlyAllCompleted = tasks.every(task => task.checked);
      
      // Optimistically update UI immediately
      const optimisticUpdatedTasks = tasks.map((task) => 
        task.id === taskId ? { ...task, checked: !task.checked } : task
      );
      setTasks(optimisticUpdatedTasks);
      
      // Check if all tasks would be completed with this update
      const wouldAllBeCompleted = optimisticUpdatedTasks.every(task => task.checked);
      
      // If completing all tasks, increment streak
      if (wouldAllBeCompleted) {
        setMaxStreak(prevStreak => prevStreak + 1);
      } 
      // If unticking when previously all completed, update the allTasksCompleted state immediately
      else if (isUnticking && currentlyAllCompleted) {
        setAllTasksCompleted(false);
        // Start removing today's date from Firestore immediately
        removeCompletedDate();
      }
      
      // Now perform the actual backend operations
      const updatedTasks = await toggleTaskCompletion(taskId);
      
      // Check if all tasks are now completed after backend update
      const allCompleted = updatedTasks.every(task => task.checked);
      setAllTasksCompleted(allCompleted);
      
      if (allCompleted) {
        // Store the completed date
        await storeCompletedDate();
        
        // Update the streak with actual value from backend
        const newMaxStreak = await calculateMaxStreak();
        setMaxStreak(newMaxStreak);
      } else if (isUnticking && currentlyAllCompleted) {
        // Make sure we've removed today's date if we're unticking a previously completed set
        await removeCompletedDate();
        
        // Update the streak with actual value from backend
        const newMaxStreak = await calculateMaxStreak();
        setMaxStreak(newMaxStreak);
      }
    } catch (error) {
      console.error("Error toggling task:", error);
      // Revert to original state if there was an error
      const originalTasks = await fetchTasks();
      setTasks(originalTasks);
      
      // Update allTasksCompleted state based on fetched tasks
      setAllTasksCompleted(originalTasks.every(task => task.checked));
      
      // Refresh the streak to ensure it's accurate
      const actualStreak = await calculateMaxStreak();
      setMaxStreak(actualStreak);
    }
  }

  const startTour = () => {
    setShowTourModal(false);
    localStorage.setItem("dashboardTourSeen", "true");

    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true,
        },
        classes: "shadow-md rounded-lg",
        scrollTo: true,
      },
      useModalOverlay: true,
    })

    tour.addStep({
      title: "<strong>Welcome to Your Dashboard</strong>",
      text: "This tour will guide you through the main features of your diabetes management dashboard.",
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    })

    tour.addStep({
      title: "<strong>Health Statistics</strong>",
      text: "📊 View your key health metrics at a glance. These cards show your current glucose levels, activity progress, and other important health indicators.",
      attachTo: {
        element: statsRef.current,
        on: "bottom",
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    })

    tour.addStep({
      title: "<strong>Calendar</strong>",
      text: "📅 Track your consistency with our streak-like calendar. When you complete all daily tasks, a checkmark appears on today&apos;s date to celebrate your progress.",
      attachTo: {
        element: calendarRef.current,
        on: "bottom",
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    })

    tour.addStep({
      title: "<strong>Daily Tasks</strong>",
      text: "📝 Manage your personalized daily tasks tailored to your health needs. Check off tasks as you complete them to maintain your health routine.",
      attachTo: {
        element: taskListRef.current,
        on: "bottom",
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    })

    tour.addStep({
      title: "<strong>Diabetes News</strong>",
      text: "📰 Stay updated with the latest in diabetes care. Our news component delivers current research, treatments, and tips to keep you informed and empowered.",
      attachTo: {
        element: newsComponentRef.current,
        on: "top",
      },
      buttons: [
        {
          text: "Next",
          action: tour.next,
        },
      ],
    })

    tour.addStep({
      title: "<strong>Quick Access</strong>",
      text: `<div><strong>Quickly access essential services:</strong></div>
      <ul>
        <li><strong>🥗 Diet Plan:</strong> Customized meal plans for managing diabetes.</li>
        <li><strong>🏋️ Exercise Plan:</strong> Tailored workout routines for your health.</li>
        <li><strong>🩸 Test Diabetes:</strong> Easy access to risk assessment tools.</li>
      </ul>`,
      attachTo: {
        element: linksRef.current,
        on: "left",
      },
      buttons: [
        {
          text: "Finish Tour",
          action: tour.complete,
        },
      ],
    })

    // Style the tour buttons
    tour.on("show", () => {
      setTimeout(() => {
        document.querySelectorAll(".shepherd-button").forEach((button) => {
          button.style.backgroundColor = "#b71c1c"
          button.style.color = "white"
          button.onmouseover = function () {
            this.style.backgroundColor = "#d32f2f"
          }
          button.onmouseout = function () {
            this.style.backgroundColor = "#b71c1c"
          }
        })
      }, 0)
    })

    tour.start()
  }

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <ChatBot />


      {/* Main Content */}
      <div className='overflow-y-auto'>
        <div className="mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg mb-8">
            <div className="px-6 py-8 sm:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">{getGreeting()}, {userName}</h1>
                  <p className="mt-2 text-lg text-blue-100">Welcome to your diabetes management dashboard</p>
                </div>
                <button
                  onClick={() => setShowTourModal(true)}
                  className="mt-4 md:mt-0 flex items-center bg-white text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition"
                >
                  <IoInformationCircleOutline className="mr-2" /> Take a Tour
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Glucose Level</p>
                  <p className="text-2xl font-bold text-gray-800">124 mg/dL</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <span className="inline-block mr-1">↓</span> 5% from yesterday
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaVial className="text-blue-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Activity</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stepsLoading ? "..." : latestSteps !== null ? `${latestSteps.toLocaleString()} steps` : "No data"}
                  </p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <span className="inline-block mr-1">↑</span> 12% from yesterday
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaRunning className="text-green-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Streak</p>
                  <p className="text-2xl font-bold text-gray-800">{maxStreak} {maxStreak === 1 ? "day" : "days"}</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">Keep it up!</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaCalendarCheck className="text-purple-600 text-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">Next Appointment</p>
                  <p className="text-2xl font-bold text-gray-800">Mar 15</p>
                  <p className="text-xs text-gray-600 flex items-center mt-1">Dr. Johnson at 10:00 AM</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaCalendarCheck className="text-yellow-600 text-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Calendar and Tasks Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div ref={calendarRef} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaCalendarCheck className="mr-2 text-blue-600" /> Your Health Calendar
              </h2>
              <div className="calendar-wrapper">
                <Calendar allTasksCompleted={allTasksCompleted} />
              </div>
            </div>

            <div ref={taskListRef} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaCalendarCheck className="mr-2 text-green-600" /> Daily Health Tasks
              </h2>
              <div className="space-y-3">
                {tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-md transition-all ${
                      task.checked
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50 border border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                      }`}
                  >

                    <div className="flex items-center">
                      {iconsPermutation[index] 
                        ? React.createElement(iconsPermutation[index], { className: colorsPermutation[index] || "text-blue-600" })
                        : <FaAppleAlt className="text-blue-600" /> // Default fallback icon
                      }
                      <span className={`ml-3 ${task.checked ? "line-through text-gray-500" : "text-gray-800"}`}>
                        {task.name}
                      </span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={task.checked}
                        onChange={() => toggleCheckbox(task.id)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}

                {allTasksCompleted && (
                  <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-md text-green-800 flex items-center">
                    <IoCheckmarkDoneCircle className="text-2xl mr-2" />
                    <span>Great job! You&apos;ve completed all your tasks for today.</span>
                  </div>
                )}

                <button
                  onClick={() => setShowAddTaskModal(true)}
                  className="mt-4 w-full py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition flex items-center justify-center"
                >
                  <span className="mr-2">+</span> Add Custom Task
                </button>
              </div>
            </div>
          </div>

          {/* News and Quick Links Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div ref={newsComponentRef} className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                <FaNewspaper className="mr-2 text-purple-600" /> Latest Diabetes News
              </h2>
              <NewsComponent />
            </div>

            <div ref={linksRef} className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Access</h2>
              <div className="space-y-3">
                <Link
                  href="/diet-plan"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition"
                >
                  <div className="bg-green-100 p-3 rounded-full mr-3">
                    <FaAppleAlt className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Diet Plan</h3>
                    <p className="text-sm text-gray-600">Personalized nutrition guidance</p>
                  </div>
                </Link>

                <Link
                  href="/exercise-plan"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                >
                  <div className="bg-blue-100 p-3 rounded-full mr-3">
                    <FaRunning className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Exercise Plan</h3>
                    <p className="text-sm text-gray-600">Tailored fitness routines</p>
                  </div>
                </Link>

                <Link
                  href="/test-diabetes"
                  className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
                >
                  <div className="bg-purple-100 p-3 rounded-full mr-3">
                    <FaVial className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Test Diabetes</h3>
                    <p className="text-sm text-gray-600">Risk assessment tools</p>
                  </div>
                </Link>

                <Link
                  href="/analysis"
                  className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition"
                >
                  <div className="bg-yellow-100 p-3 rounded-full mr-3">
                    <FaChartLine className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Analytics</h3>
                    <p className="text-sm text-gray-600">View your health trends</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tour Modal */}
      <Modal
        isOpen={showTourModal}
        onRequestClose={() => setShowTourModal(false)}
        contentLabel="Tour Confirmation"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">Welcome to Diabetes Decoded</h2>
          <p className="text-gray-600 mb-4">
            Would you like to take a quick tour to learn about the features of your dashboard?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => {
                setShowTourModal(false);
                localStorage.setItem("dashboardTourSeen", "true");
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              Skip
            </button>
            <button
              onClick={startTour}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Start Tour
            </button>
          </div>
        </div>
      </Modal>

      {/* Add Custom Task Modal */}
      <Modal
        isOpen={showAddTaskModal}
        onRequestClose={() => {
          setShowAddTaskModal(false);
          setNewTaskName("");
          setAddTaskError("");
        }}
        contentLabel="Add Custom Task"
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
        ariaHideApp={false}
      >
        <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Add Custom Task</h2>
          
          {addTaskError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
              {addTaskError}
            </div>
          )}
          
          <form onSubmit={async (e) => {
            e.preventDefault();
            if (!newTaskName.trim()) {
              setAddTaskError("Please enter a task name");
              return;
            }
            
            setIsAddingTask(true);
            try {
              const result = await addTask(newTaskName);
              
              // Refresh the full task list for consistency
              const updatedTasks = await fetchTasks();
              setTasks(updatedTasks);
              
              // Close modal and reset
              setShowAddTaskModal(false);
              setNewTaskName("");
              setAddTaskError("");
            } catch (error) {
              console.error("Error adding task:", error);
              setAddTaskError("Failed to add task. Please try again.");
            } finally {
              setIsAddingTask(false);
            }
          }}>
            <div className="mb-4">
              <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Enter your custom task"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isAddingTask}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddTaskModal(false);
                  setNewTaskName("");
                  setAddTaskError("");
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                disabled={isAddingTask}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
                disabled={isAddingTask}
              >
                {isAddingTask ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}

