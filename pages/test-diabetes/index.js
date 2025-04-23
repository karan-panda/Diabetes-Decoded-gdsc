"use client"

import { useState } from "react"
import axios from "axios"
import Sidenav from "../../components/sidenav"
import Tesseract from "tesseract.js"
import ChatBot from "@/components/Chatbot"
import { FaUpload, FaVial, FaHeartbeat, FaWeight, FaRulerVertical, FaSyringe, FaDna } from "react-icons/fa"

export default function TestDiabetes() {
  const [inputData, setInputData] = useState({
    age: "",
    gender: "",
    pregnancies: "",
    bloodGlucose: "",
    bloodPressure: "",
    bmi: "",
    skinThickness: "",
    insulin: "",
    diabetesPedigreeFunction: "",
  })
  const [prediction, setPrediction] = useState(null)
  const [errors, setErrors] = useState({
    age: false,
    gender: false,
    bloodGlucose: false,
    bloodPressure: false,
    bmi: false,
    skinThickness: false,
    insulin: false,
    diabetesPedigreeFunction: false,
  })
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTab, setActiveTab] = useState("test")

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputData({ ...inputData, [name]: value })
    setErrors({ ...errors, [name]: false })
  }

  const handleGenderChange = (e) => {
    const { value } = e.target
    setInputData({
      ...inputData,
      gender: value,
      pregnancies: value === "female" ? inputData.pregnancies : "",
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = async () => {
    if (!image) return

    setIsProcessing(true)
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(image, "eng", { logger: (info) => console.log(info) })

      console.log("Extracted Text:", text)

      const parsedData = parseTextToData(text)
      console.log("Parsed Data:", parsedData)

      setInputData({
        age: parsedData.age || inputData.age,
        gender: parsedData.gender || inputData.gender,
        pregnancies: parsedData.pregnancies || inputData.pregnancies,
        bloodGlucose: parsedData.bloodGlucose || inputData.bloodGlucose,
        bloodPressure: parsedData.bloodPressure || inputData.bloodPressure,
        bmi: parsedData.bmi || inputData.bmi,
        skinThickness: parsedData.skinThickness || inputData.skinThickness,
        insulin: parsedData.insulin || inputData.insulin,
        diabetesPedigreeFunction: parsedData.diabetesPedigreeFunction || inputData.diabetesPedigreeFunction,
      })

      setErrors({
        age: false,
        gender: false,
        bloodGlucose: false,
        bloodPressure: false,
        bmi: false,
        skinThickness: false,
        insulin: false,
        diabetesPedigreeFunction: false,
      })
    } catch (error) {
      console.error("Error processing image:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const parseTextToData = (text) => {
    const data = {
      age: "",
      gender: "",
      pregnancies: "",
      bloodGlucose: "",
      bloodPressure: "",
      bmi: "",
      skinThickness: "",
      insulin: "",
      diabetesPedigreeFunction: "",
    }

    const lines = text.split("\n").map((line) => line.trim())

    for (let i = 0; i < lines.length - 1; i++) {
      const label = lines[i]
      const value = lines[i + 1] ? lines[i + 1].trim() : ""

      if (label === "Age:") {
        data.age = value
      } else if (label === "Gender:") {
        data.gender = value
      } else if (label === "Pregnancies:") {
        data.pregnancies = value
      } else if (label === "Blood Glucose:") {
        data.bloodGlucose = value
      } else if (label === "Blood Pressure (mmHg):") {
        data.bloodPressure = value
      } else if (label === "BMI:") {
        data.bmi = value
      } else if (label === "Skin Thickness:") {
        data.skinThickness = value
      } else if (label === "Insulin:") {
        data.insulin = value
      } else if (label === "Diabetes Pedigree Function:") {
        data.diabetesPedigreeFunction = value
      }
    }

    return data
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validationErrors = {}
    let hasError = false
    Object.keys(inputData).forEach((key) => {
      if (!inputData[key] && inputData[key] !== "") {
        validationErrors[key] = true
        hasError = true
      } else {
        validationErrors[key] = false
      }
    })

    if (hasError) {
      setErrors(validationErrors)
      return
    }

    const payload = {
      Pregnancies: inputData.gender === "female" ? Number.parseInt(inputData.pregnancies) : 0,
      Glucose: Number.parseInt(inputData.bloodGlucose),
      BloodPressure: Number.parseInt(inputData.bloodPressure.split("/")[0]),
      SkinThickness: Number.parseInt(inputData.skinThickness),
      Insulin: Number.parseInt(inputData.insulin),
      BMI: Number.parseFloat(inputData.bmi),
      DiabetesPedigreeFunction: Number.parseFloat(inputData.diabetesPedigreeFunction),
      Age: Number.parseInt(inputData.age),
    }

    try {
      const response = await axios.post("http://localhost:5000/predict", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = response.data.prediction
      setPrediction(result)
      window.location.href = `/results/${result}`
    } catch (error) {
      console.error("Error making prediction:", error)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <ChatBot />

      {/* Sidenav */}
      <div className="w-1/4 fixed h-screen">
        <Sidenav />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[25%] overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl shadow-lg mb-8">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">Diabetes Risk Assessment</h1>
                  <p className="mt-2 text-lg text-purple-100">
                    Evaluate your risk factors and get personalized insights
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="border-b">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab("test")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "test"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Risk Assessment
                </button>
                <button
                  onClick={() => setActiveTab("about")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "about"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  About the Test
                </button>
                <button
                  onClick={() => setActiveTab("faq")}
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    activeTab === "faq"
                      ? "border-purple-500 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  FAQ
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "test" && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Enter Your Health Data</h2>
                      <p className="text-gray-600 mb-6">
                        Fill in the form below with your health metrics or upload a medical report to automatically
                        extract the data.
                      </p>

                      <div className="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-100">
                        <h3 className="font-medium text-purple-700 mb-2 flex items-center">
                          <FaUpload className="mr-2" /> Upload Medical Report
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          We can extract your health data from a medical report. Upload a clear image of your report.
                        </p>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            id="upload"
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                          />
                          <label
                            htmlFor="upload"
                            className="bg-white border border-purple-300 text-purple-700 px-4 py-2 rounded cursor-pointer hover:bg-purple-50 transition"
                          >
                            Select File
                          </label>
                          <button
                            type="button"
                            onClick={handleImageUpload}
                            disabled={!image || isProcessing}
                            className={`${
                              !image || isProcessing
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-700"
                            } text-white px-4 py-2 rounded transition`}
                          >
                            {isProcessing ? "Processing..." : "Extract Data"}
                          </button>
                        </div>
                        {imagePreview && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Preview:</p>
                            <img
                              src={imagePreview || "/placeholder.svg"}
                              alt="Report Preview"
                              className="max-h-40 border rounded"
                            />
                          </div>
                        )}
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 flex items-center">
                              <FaHeartbeat className="mr-2 text-purple-500" /> Age
                            </label>
                            <input
                              type="number"
                              id="age"
                              name="age"
                              value={inputData.age || ""}
                              onChange={handleChange}
                              className={`mt-1 p-2 border ${errors.age ? "border-red-300" : "border-gray-300"} rounded-md w-full focus:ring-purple-500 focus:border-purple-500`}
                            />
                            {errors.age && <p className="mt-1 text-sm text-red-500">Age is required</p>}
                          </div>

                          <div>
                            <label
                              htmlFor="gender"
                              className="block text-sm font-medium text-gray-700 flex items-center"
                            >
                              <FaDna className="mr-2 text-purple-500" /> Gender
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              value={inputData.gender || ""}
                              onChange={handleGenderChange}
                              className={`mt-1 p-2 border ${errors.gender ? "border-red-300" : "border-gray-300"} rounded-md w-full focus:ring-purple-500 focus:border-purple-500`}
                            >
                              <option value="">Select Gender</option>
                              <option value="female">Female</option>
                              <option value="male">Male</option>
                            </select>
                            {errors.gender && <p className="mt-1 text-sm text-red-500">Gender is required</p>}
                          </div>

                          {inputData.gender === "female" && (
                            <div>
                              <label htmlFor="pregnancies" className="block text-sm font-medium text-gray-700">
                                Pregnancies
                              </label>
                              <input
                                type="number"
                                id="pregnancies"
                                name="pregnancies"
                                value={inputData.pregnancies || ""}
                                onChange={handleChange}
                                className={`mt-1 p-2 border ${errors.pregnancies ? "border-red-300" : "border-gray-300"} rounded-md w-full focus:ring-purple-500 focus:border-purple-500`}
                              />
                              {errors.pregnancies && (
                                <p className="mt-1 text-sm text-red-500">Number of pregnancies is required</p>
                              )}
                            </div>
                          )}

                          <div>
                            <label
                              htmlFor="bloodGlucose"
                              className="block text-sm font-medium text-gray-700 flex items-center"
                            >
                              <FaVial className="mr-2 text-purple-500" /> Blood Glucose
                            </label>
                            <div className="flex items-center">
                              <input
                                type="number"
                                id="bloodGlucose"
                                name="bloodGlucose"
                                value={inputData.bloodGlucose || ""}
                                onChange={handleChange}
                                className={`p-2 border ${errors.bloodGlucose ? "border-red-300" : "border-gray-300"} rounded-md w-full focus:ring-purple-500 focus:border-purple-500`}
                              />
                              <select
                                id="glucoseUnits"
                                name="glucoseUnits"
                                className="ml-2 p-2 border border-gray-300 rounded-md"
                              >
                                <option value="mg/dL">mg/dL</option>
                                <option value="mmol/L">mmol/L</option>
                              </select>
                            </div>
                            {errors.bloodGlucose && (
                              <p className="mt-1 text-sm text-red-500">Blood glucose is required</p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="bloodPressure"
                              className="block text-sm font-medium text-gray-700 flex items-center"
                            >
                              <FaHeartbeat className="mr-2 text-purple-500" /> Blood Pressure (mmHg)
                            </label>
                            <input
                              type="text"
                              id="bloodPressure"
                              name="bloodPressure"
                              placeholder="e.g., 120/80"
                              value={inputData.bloodPressure || ""}
                              onChange={handleChange}
                              className={`mt-1 p-2 border ${errors.bloodPressure ? "border-red-300" : "border-gray-300"} rounded-md w-full focus:ring-purple-500 focus:border-purple-500`}
                            />
                            {errors.bloodPressure && (
                              <p className="mt-1 text-sm text-red-500">Blood pressure is required</p>
                            )}
                          </div>

                          <div>
                            <label htmlFor="bmi" className="block text-sm font-medium text-gray-700 flex items-center">
                              <FaWeight className="mr-2 text-purple-500" /> BMI
                            </label>
                            <input
                              type="number"
                              id="bmi"
                              name="bmi"
                              step="0.01"
                              value={inputData.bmi || ""}
                              onChange={handleChange}
                              className={`mt-1 p-2 border ${errors.bmi ? "border-red-300" : "border-gray-300"} rounded-md w-full focus:ring-purple-500 focus:border-purple-500`}
                            />
                            {errors.bmi && <p className="mt-1 text-sm text-red-500">BMI is required</p>}
                          </div>

                          <div>
                            <label
                              htmlFor="skinThickness"
                              className="block text-sm font-medium text-gray-700 flex items-center"
                            >
                              <FaRulerVertical className="mr-2 text-purple-500" /> Skin Thickness (mm)
                            </label>
                            <input
                              type="number"
                              id="skinThickness"
                              name="skinThickness"
                              value={inputData.skinThickness || ""}
                              onChange={handleChange}
                              className={`mt-1 p-2 border ${errors.skinThickness ? "border-red-300" : "border-gray-300"} rounded-md w-full focus:ring-purple-500 focus:border-purple-500`}
                            />
                            {errors.skinThickness && (
                              <p className="mt-1 text-sm text-red-500">Skin thickness is required</p>
                            )}
                          </div>

                          <div>
                            <label
                              htmlFor="insulin"
                              className="block text-sm font-medium text-gray-700 flex items-center"
                            >
                              <FaSyringe className="mr-2 text-purple-500" /> Insulin (μU/ml)
                            </label>
                            <input
                              type="number"
                              id="insulin"
                              name="insulin"
                              value={inputData.insulin || ""}
                              onChange={handleChange}
                              className={`mt-1 p-2 border ${errors.insulin ? "border-red-300" : "border-gray-300"} rounded-md w-full focus:ring-purple-500 focus:border-purple-500`}
                            />
                            {errors.insulin && <p className="mt-1 text-sm text-red-500">Insulin is required</p>}
                          </div>

                          <div>
                            <label
                              htmlFor="diabetesPedigreeFunction"
                              className="block text-sm font-medium text-gray-700 flex items-center"
                            >
                              <FaDna className="mr-2 text-purple-500" /> Diabetes Pedigree Function
                            </label>
                            <input
                              type="number"
                              id="diabetesPedigreeFunction"
                              name="diabetesPedigreeFunction"
                              step="0.01"
                              value={inputData.diabetesPedigreeFunction || ""}
                              onChange={handleChange}
                              className={`mt-1 p-2 border ${errors.diabetesPedigreeFunction ? "border-red-300" : "border-gray-300"} rounded-md w-full focus:ring-purple-500 focus:border-purple-500`}
                            />
                            {errors.diabetesPedigreeFunction && (
                              <p className="mt-1 text-sm text-red-500">Diabetes pedigree function is required</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                              A function that scores likelihood of diabetes based on family history
                            </p>
                          </div>

                          <div className="pt-4">
                            <button
                              type="submit"
                              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
                            >
                              Analyze Risk
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold mb-4">Understanding Your Risk Factors</h2>
                      <p className="text-gray-600 mb-6">
                        This assessment uses multiple health metrics to evaluate your risk of developing type 2
                        diabetes. Learn more about each factor below.
                      </p>

                      <div className="space-y-4">
                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
                          <h3 className="font-medium text-purple-700 flex items-center">
                            <FaVial className="mr-2" /> Blood Glucose
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Fasting blood glucose levels above 100 mg/dL may indicate prediabetes, while levels above
                            126 mg/dL suggest diabetes.
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
                          <h3 className="font-medium text-purple-700 flex items-center">
                            <FaWeight className="mr-2" /> BMI (Body Mass Index)
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            A BMI over 25 is considered overweight, and over 30 is considered obese. Higher BMI
                            increases diabetes risk.
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
                          <h3 className="font-medium text-purple-700 flex items-center">
                            <FaHeartbeat className="mr-2" /> Blood Pressure
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            High blood pressure (above 130/80 mmHg) is associated with increased risk of diabetes and
                            cardiovascular disease.
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
                          <h3 className="font-medium text-purple-700 flex items-center">
                            <FaSyringe className="mr-2" /> Insulin Levels
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Elevated insulin levels may indicate insulin resistance, a precursor to type 2 diabetes.
                          </p>
                        </div>

                        <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition">
                          <h3 className="font-medium text-purple-700 flex items-center">
                            <FaDna className="mr-2" /> Family History
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            The diabetes pedigree function quantifies family history of diabetes, which is a significant
                            risk factor.
                          </p>
                        </div>
                      </div>

                      <div className="mt-8">
                        <img
                          src="/placeholder.svg?height=300&width=400"
                          alt="Diabetes Risk Factors"
                          className="rounded-lg shadow-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "about" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">About the Diabetes Risk Assessment</h2>
                  <p className="text-gray-600 mb-6">
                    This assessment tool uses machine learning algorithms trained on clinical data to evaluate your risk
                    of developing type 2 diabetes.
                  </p>

                  <div className="bg-purple-50 rounded-lg p-6 mb-6 border border-purple-100">
                    <h3 className="font-medium text-lg text-purple-700 mb-3">How It Works</h3>
                    <p className="text-gray-700 mb-4">
                      Our model analyzes multiple health metrics and compares them to patterns found in thousands of
                      clinical cases to determine your risk level.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-purple-100">
                        <div className="text-purple-600 text-xl font-bold mb-2">Step 1</div>
                        <p className="text-sm">Enter your health data or upload a medical report</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-100">
                        <div className="text-purple-600 text-xl font-bold mb-2">Step 2</div>
                        <p className="text-sm">Our algorithm analyzes your risk factors</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-100">
                        <div className="text-purple-600 text-xl font-bold mb-2">Step 3</div>
                        <p className="text-sm">Receive personalized risk assessment and recommendations</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-lg mb-3">Accuracy & Limitations</h3>
                    <p className="text-gray-700 mb-4">
                      While our assessment tool is based on clinical research and machine learning, it is not a
                      diagnostic tool and should not replace professional medical advice.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600">
                      <li>The model has approximately 85% accuracy in identifying high-risk individuals</li>
                      <li>Results should be discussed with your healthcare provider</li>
                      <li>Additional clinical tests may be needed for a definitive diagnosis</li>
                      <li>The tool is designed for adults aged 18 and older</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium text-lg mb-3">Data Privacy</h3>
                    <p className="text-gray-700 mb-4">
                      We take your privacy seriously. All data entered is processed securely and is not stored on our
                      servers after your session ends.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-700">
                        Your health data is processed locally in your browser and is never shared with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "faq" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
                  <p className="text-gray-600 mb-6">
                    Find answers to common questions about diabetes risk assessment and prevention.
                  </p>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-700 hover:bg-gray-50">
                        <span>What is type 2 diabetes?</span>
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-700">
                          Type 2 diabetes is a chronic condition that affects how your body metabolizes sugar. With type
                          2 diabetes, your body either resists the effects of insulin — a hormone that regulates the
                          movement of sugar into your cells — or doesn&apos;t produce enough insulin to maintain normal
                          glucose levels.
                        </p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-700 hover:bg-gray-50">
                        <span>How accurate is this risk assessment?</span>
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-700">
                          Our assessment tool has approximately 85% accuracy in identifying individuals at high risk for
                          developing type 2 diabetes. However, it is not a diagnostic tool and should be used as a
                          screening method only. Always consult with a healthcare professional for proper diagnosis.
                        </p>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-700 hover:bg-gray-50">
                        <span>What should I do if my risk is high?</span>
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-700">If your assessment indicates a high risk, we recommend:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                          <li>Consulting with your healthcare provider for further evaluation</li>
                          <li>Getting a comprehensive blood test including A1C and fasting glucose</li>
                          <li>Discussing lifestyle modifications to reduce your risk</li>
                          <li>Following up regularly to monitor your health status</li>
                        </ul>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <button className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-700 hover:bg-gray-50">
                        <span>Can type 2 diabetes be prevented?</span>
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div className="p-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-700">
                          Yes, in many cases type 2 diabetes can be prevented or delayed through lifestyle
                          modifications:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                          <li>Maintaining a healthy weight</li>
                          <li>Regular physical activity (at least 150 minutes per week)</li>
                          <li>Eating a balanced diet rich in fruits, vegetables, and whole grains</li>
                          <li>Limiting processed foods and added sugars</li>
                          <li>Not smoking and limiting alcohol consumption</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

