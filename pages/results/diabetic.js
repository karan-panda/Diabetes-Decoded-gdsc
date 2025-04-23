import Link from "next/link"
import {
  FaArrowRight,
  FaExclamationTriangle,
  FaAppleAlt,
  FaRunning,
  FaHeartbeat,
  FaCalendarCheck,
} from "react-icons/fa"

export default function Diabetic() {
  const probability = 80

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      {/* Top decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-red-600 rounded-b-[30%] opacity-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-red-500 rounded-bl-full opacity-5"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Alert Banner */}
          <div className="bg-red-100 border-l-4 border-red-600 p-4 mb-8 rounded-r-lg shadow-md">
            <div className="flex items-center">
              <FaExclamationTriangle className="text-red-600 text-2xl mr-4" />
              <div>
                <h2 className="text-lg font-semibold text-red-800">Important Health Alert</h2>
                <p className="text-red-700">
                  Your test results indicate a high probability of diabetes. Please consult with a healthcare
                  professional as soon as possible.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-800 px-8 py-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold">Diabetes Risk Assessment Results</h1>
              <p className="mt-2 opacity-90">Based on the information you provided</p>
            </div>

            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column - Results */}
                <div className="md:w-1/2">
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h2 className="text-2xl font-bold text-red-800 mb-4">Your Results</h2>

                    <div className="mb-6">
                      <p className="text-gray-700 mb-2">Risk Assessment:</p>
                      <div className="flex items-center">
                        <span className="text-3xl font-bold text-red-700">{probability}%</span>
                        <span className="ml-2 text-red-600">Probability of Diabetes</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Blood Glucose:</span>
                        <span className="font-semibold text-red-700">Above Normal Range</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">BMI:</span>
                        <span className="font-semibold text-red-700">Elevated</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Family History:</span>
                        <span className="font-semibold text-red-700">High Risk Factor</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                    <h2 className="text-xl font-bold text-yellow-800 mb-4">Next Steps</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="bg-yellow-200 rounded-full p-1 mr-3 mt-1">
                          <FaCalendarCheck className="text-yellow-700" />
                        </div>
                        <span>Schedule an appointment with your doctor for a formal diagnosis</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-yellow-200 rounded-full p-1 mr-3 mt-1">
                          <FaHeartbeat className="text-yellow-700" />
                        </div>
                        <span>Request an A1C blood test to confirm diabetes status</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-yellow-200 rounded-full p-1 mr-3 mt-1">
                          <FaAppleAlt className="text-yellow-700" />
                        </div>
                        <span>Begin following our recommended diet plan</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-yellow-200 rounded-full p-1 mr-3 mt-1">
                          <FaRunning className="text-yellow-700" />
                        </div>
                        <span>Start a gentle exercise routine to improve insulin sensitivity</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Recommendations */}
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Personalized Recommendations</h2>

                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">Diet Plan</h3>
                      <p className="text-gray-700 mb-4">
                        A proper diet is crucial for managing diabetes. We've created a personalized meal plan based on
                        your profile.
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-white p-3 rounded-lg border border-blue-100">
                          <h4 className="font-medium text-blue-700">Recommended</h4>
                          <ul className="text-sm text-gray-600 space-y-1 mt-1">
                            <li>• Whole grains</li>
                            <li>• Leafy vegetables</li>
                            <li>• Lean proteins</li>
                            <li>• Healthy fats</li>
                          </ul>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-blue-100">
                          <h4 className="font-medium text-red-700">Limit or Avoid</h4>
                          <ul className="text-sm text-gray-600 space-y-1 mt-1">
                            <li>• Refined carbs</li>
                            <li>• Sugary drinks</li>
                            <li>• Processed foods</li>
                            <li>• Excessive alcohol</li>
                          </ul>
                        </div>
                      </div>
                      <Link
                        href="/diet-plan"
                        className="flex items-center text-blue-700 font-medium hover:text-blue-800 transition"
                      >
                        View detailed diet plan <FaArrowRight className="ml-2" />
                      </Link>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                      <h3 className="text-xl font-semibold text-green-800 mb-3">Exercise Plan</h3>
                      <p className="text-gray-700 mb-4">
                        Regular physical activity helps control blood sugar levels and improves insulin sensitivity.
                      </p>
                      <div className="bg-white p-4 rounded-lg border border-green-100 mb-4">
                        <h4 className="font-medium text-green-700 mb-2">Recommended Activities</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>Walking (30 min/day)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>Swimming (2x/week)</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>Strength training</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>Yoga or stretching</span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/exercise-plan"
                        className="flex items-center text-green-700 font-medium hover:text-green-800 transition"
                      >
                        View detailed exercise plan <FaArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-8 text-center">
                <Link
                  href="/home"
                  className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition shadow-md"
                >
                  Go to Dashboard
                </Link>
                <p className="mt-4 text-gray-600">
                  Remember, early intervention is key to managing diabetes effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

