"use client"

import { useState } from "react"

import ExercisePlan from "../../components/ExercisePlan"
import ChatBot from "@/components/Chatbot"
import { FaDumbbell, FaHeartbeat, FaRunning, FaCalendarAlt, FaVideo, FaBookOpen } from "react-icons/fa"
import { GiMuscleUp, GiWeightLiftingUp } from "react-icons/gi"
import { MdDirectionsRun, MdFitnessCenter } from "react-icons/md"

const ExercisePlanPage = () => {
  const [activeTab, setActiveTab] = useState("search")

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <ChatBot />

      {/* Main Content */}
      <div >
        <div className="mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg mb-8">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="flex items-center justify-between flex-wrap">
                <div>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">Fitness & Exercise Hub</h1>
                  <p className="mt-2 text-lg text-blue-100">
                    Discover diabetes-friendly workouts tailored to your needs
                  </p>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                  <button className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition flex items-center">
                    <FaVideo className="mr-2" /> Video Library
                  </button>
                  <button className="bg-white text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-50 transition flex items-center">
                    <FaCalendarAlt className="mr-2" /> Workout Planner
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaHeartbeat className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Cardio Workouts</h3>
                  <p className="text-sm text-gray-600">Heart-healthy exercises</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <GiMuscleUp className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Strength Training</h3>
                  <p className="text-sm text-gray-600">Build muscle & improve insulin sensitivity</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <FaRunning className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Low-Impact</h3>
                  <p className="text-sm text-gray-600">Gentle on joints & feet</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-yellow-500">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <MdFitnessCenter className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-medium">Home Workouts</h3>
                  <p className="text-sm text-gray-600">No equipment needed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("search")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "search"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Exercise Search
                </button>
                <button
                  onClick={() => setActiveTab("guidelines")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "guidelines"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Exercise Guidelines
                </button>
                <button
                  onClick={() => setActiveTab("precautions")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "precautions"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Diabetes Precautions
                </button>
                <button
                  onClick={() => setActiveTab("videos")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "videos"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Video Tutorials
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "search" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaDumbbell className="text-blue-500 mr-2" /> Find the Perfect Exercise
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Search for exercises based on muscle group, equipment, or difficulty level. Each exercise includes
                    detailed instructions and images.
                  </p>
                  <ExercisePlan />
                </div>
              )}

              {activeTab === "guidelines" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaBookOpen className="text-blue-500 mr-2" /> Exercise Guidelines for Diabetes
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-5 bg-blue-50">
                      <h3 className="font-medium text-lg mb-2 text-blue-700">Recommended Activity Levels</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            1
                          </span>
                          <span>150 minutes of moderate-intensity aerobic activity weekly</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            2
                          </span>
                          <span>2-3 sessions of resistance training per week</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            3
                          </span>
                          <span>Break up sitting time every 30 minutes</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            4
                          </span>
                          <span>Include flexibility and balance exercises 2-3 times weekly</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-5 bg-green-50">
                      <h3 className="font-medium text-lg mb-2 text-green-700">Benefits of Regular Exercise</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            ✓
                          </span>
                          <span>Improves insulin sensitivity and blood glucose control</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            ✓
                          </span>
                          <span>Reduces cardiovascular risk factors</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            ✓
                          </span>
                          <span>Helps with weight management</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            ✓
                          </span>
                          <span>Improves overall quality of life and mental health</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-5 bg-purple-50">
                      <h3 className="font-medium text-lg mb-2 text-purple-700">Getting Started Safely</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            1
                          </span>
                          <span>Consult with your healthcare provider before starting</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            2
                          </span>
                          <span>Start slowly and gradually increase intensity</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            3
                          </span>
                          <span>Monitor blood glucose before, during, and after exercise</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-purple-200 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            4
                          </span>
                          <span>Stay hydrated and wear proper footwear</span>
                        </li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-5 bg-yellow-50">
                      <h3 className="font-medium text-lg mb-2 text-yellow-700">Types of Exercise to Include</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            1
                          </span>
                          <span>Aerobic: Walking, swimming, cycling, dancing</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            2
                          </span>
                          <span>Resistance: Weight training, resistance bands, bodyweight exercises</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            3
                          </span>
                          <span>Flexibility: Stretching, yoga</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                            4
                          </span>
                          <span>Balance: Tai chi, stability exercises</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "precautions" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <MdDirectionsRun className="text-blue-500 mr-2" /> Special Precautions for Diabetes
                  </h2>

                  <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-6">
                    <h3 className="font-medium text-lg mb-2 text-red-700">Important Safety Considerations</h3>
                    <p className="text-gray-700 mb-4">
                      People with diabetes need to take special precautions when exercising to ensure safety and
                      maximize benefits.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-red-100">
                        <h4 className="font-medium text-red-700 mb-2">Blood Glucose Monitoring</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Check blood glucose before exercise</li>
                          <li>• If below 100 mg/dL, have a small carb snack</li>
                          <li>• If above 250 mg/dL with ketones, avoid exercise</li>
                          <li>• Monitor during long workout sessions</li>
                          <li>• Check again after exercise</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-red-100">
                        <h4 className="font-medium text-red-700 mb-2">Hypoglycemia Prevention</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Always carry fast-acting carbs (glucose tablets)</li>
                          <li>• Exercise with a partner when possible</li>
                          <li>• Wear medical ID</li>
                          <li>• Adjust insulin or medication as advised by doctor</li>
                          <li>• Know the signs: shakiness, confusion, sweating</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-red-100">
                        <h4 className="font-medium text-red-700 mb-2">Foot Care During Exercise</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Wear proper-fitting athletic shoes</li>
                          <li>• Use moisture-wicking socks</li>
                          <li>• Inspect feet before and after exercise</li>
                          <li>• Avoid barefoot activities</li>
                          <li>• Treat blisters or injuries promptly</li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-red-100">
                        <h4 className="font-medium text-red-700 mb-2">Hydration & Timing</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Stay well-hydrated before, during, and after</li>
                          <li>• Avoid exercise during peak insulin action</li>
                          <li>• Best time: 1-3 hours after eating</li>
                          <li>• Avoid very hot or cold conditions</li>
                          <li>• Adjust timing based on medication schedule</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                    <h3 className="font-medium text-lg mb-2 text-blue-700">When to Consult Your Healthcare Provider</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-medium text-blue-700 mb-2">Before Starting</h4>
                        <p className="text-sm text-gray-700">
                          Always consult your healthcare provider before beginning a new exercise program, especially if
                          you have complications like neuropathy, retinopathy, or heart disease.
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-medium text-blue-700 mb-2">Warning Signs</h4>
                        <p className="text-sm text-gray-700">
                          Stop exercising and seek medical attention if you experience chest pain, severe shortness of
                          breath, dizziness, or unusual fatigue during exercise.
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-blue-100">
                        <h4 className="font-medium text-blue-700 mb-2">Regular Check-ins</h4>
                        <p className="text-sm text-gray-700">
                          Discuss your exercise routine during regular appointments to adjust medication, insulin, or
                          nutrition plans as your fitness improves.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "videos" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <FaVideo className="text-blue-500 mr-2" /> Exercise Video Tutorials
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Watch expert-led workout videos designed specifically for people with diabetes. These videos include
                    proper form demonstrations and safety tips.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Beginner Walking Program"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Beginner Walking Program</h3>
                        <p className="text-sm text-gray-600 mt-1">15 minutes • Low Impact</p>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Resistance Band Workout"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Resistance Band Workout</h3>
                        <p className="text-sm text-gray-600 mt-1">20 minutes • Moderate</p>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <img
                          src="/placeholder.svg?height=200&width=350"
                          alt="Chair Yoga for Diabetes"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">Chair Yoga for Diabetes</h3>
                        <p className="text-sm text-gray-600 mt-1">25 minutes • Low Impact</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Expert Help Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <GiWeightLiftingUp className="text-blue-500 mr-2" /> Expert Fitness Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-5 bg-gradient-to-br from-blue-50 to-indigo-50">
                <h3 className="font-medium text-lg mb-2 text-blue-700">Book a Consultation</h3>
                <p className="text-gray-700 mb-4">
                  Schedule a one-on-one session with a certified diabetes exercise specialist to create a personalized
                  fitness plan.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Book Appointment
                </button>
              </div>

              <div className="border rounded-lg p-5 bg-gradient-to-br from-purple-50 to-pink-50">
                <h3 className="font-medium text-lg mb-2 text-purple-700">Join Group Classes</h3>
                <p className="text-gray-700 mb-4">
                  Participate in virtual or in-person group fitness classes designed specifically for people with
                  diabetes.
                </p>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                  View Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExercisePlanPage

