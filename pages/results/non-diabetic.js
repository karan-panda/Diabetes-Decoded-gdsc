import Link from "next/link"
import { FaArrowRight, FaCheckCircle, FaAppleAlt, FaRunning, FaHeartbeat, FaCalendarCheck } from "react-icons/fa"

export default function NonDiabetic() {
  const probability = 85

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Top decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-green-600 rounded-b-[30%] opacity-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-green-500 rounded-bl-full opacity-5"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Success Banner */}
          <div className="bg-green-100 border-l-4 border-green-600 p-4 mb-8 rounded-r-lg shadow-md">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-600 text-2xl mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-green-800">Good News!</h2>
                <p className="text-green-700">
                  Your test results indicate a low probability of diabetes. Continue your healthy habits to maintain
                  your well-being.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-800 px-8 py-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold">Diabetes Risk Assessment Results</h1>
              <p className="mt-2 opacity-90">Based on the information you provided</p>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Results */}
                <div className="md:w-1/2">
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h2 className="text-2xl font-bold text-green-800 mb-4">Your Results</h2>

                    <div className="mb-6">
                      <p className="text-gray-700 mb-2">Risk Assessment:</p>
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-green-700">{probability}%</span>
                        <span className="ml-2 text-green-600">Probability of NOT Having Diabetes</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Blood Glucose:</span>
                        <span className="font-semibold text-green-700">Normal Range</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">BMI:</span>
                        <span className="font-semibold text-green-700">Healthy</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Family History:</span>
                        <span className="font-semibold text-green-700">Low Risk Factor</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <h2 className="text-xl font-bold text-blue-800 mb-4">Maintaining Your Health</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-blue-200 rounded-full p-1 mr-3 mt-1">
                          <FaCalendarCheck className="text-blue-700" />
                        </div>
                        <span>Continue with regular health check-ups (at least annually)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-200 rounded-full p-1 mr-3 mt-1">
                          <FaHeartbeat className="text-blue-700" />
                        </div>
                        <span>Monitor your blood pressure and cholesterol levels</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-200 rounded-full p-1 mr-3 mt-1">
                          <FaAppleAlt className="text-blue-700" />
                        </div>
                        <span>Maintain a balanced diet rich in fruits, vegetables, and whole grains</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-200 rounded-full p-1 mr-3 mt-1">
                          <FaRunning className="text-blue-700" />
                        </div>
                        <span>Stay physically active with at least 150 minutes of exercise weekly</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Recommendations */}
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Preventive Recommendations</h2>

                  <div className="space-y-6">
                    <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                      <h3 className="text-xl font-semibold text-purple-800 mb-3">Nutrition Tips</h3>
                      <p className="text-gray-700 mb-4">
                        Even with a low risk, maintaining a healthy diet is important for preventing diabetes and other
                        health conditions.
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white p-3 rounded-lg border border-purple-100">
                          <h4 className="font-medium text-purple-700">Focus On</h4>
                          <ul className="text-sm text-gray-600 space-y-1 mt-1">
                            <li>• Colorful vegetables</li>
                            <li>• Lean proteins</li>
                            <li>• Whole grains</li>
                            <li>• Healthy fats</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-purple-100">
                          <h4 className="font-medium text-purple-700">Portion Control</h4>
                          <ul className="text-sm text-gray-600 space-y-1 mt-1">
                            <li>• Use smaller plates</li>
                            <li>• Eat mindfully</li>
                            <li>• Stay hydrated</li>
                            <li>• Limit processed foods</li>
                          </ul>
                        </div>
                      </div>
                      <Link
                        href="/diet-plan"
                        className="flex items-center text-purple-700 font-medium hover:text-purple-800 transition"
                      >
                        Explore healthy recipes <FaArrowRight className="ml-2" />
                      </Link>
                    </div>

                    <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                      <h3 className="text-xl font-semibold text-yellow-800 mb-3">Fitness Recommendations</h3>
                      <p className="text-gray-700 mb-4">
                        Regular physical activity helps maintain insulin sensitivity and overall health.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-yellow-100 mb-4">
                        <h4 className="font-medium text-yellow-700 mb-2">Balanced Fitness Plan</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span>Cardio (3-5x/week)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span>Strength (2-3x/week)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span>Flexibility exercises</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                            <span>Active lifestyle habits</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/exercise-plan"
                        className="flex items-center text-yellow-700 font-medium hover:text-yellow-800 transition"
                      >
                        Explore fitness programs <FaArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 text-center">
                <Link
                  href="/home"
                  className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition shadow-md"
                >
                  Go to Dashboard
                </Link>
                <p className="mt-4 text-gray-600">Prevention is the best medicine. Keep up your healthy habits!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

