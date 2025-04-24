"use client"

import { useState } from "react"
import { FaFileUpload, FaSpinner, FaExclamationTriangle, FaCheckCircle, FaFilePdf } from "react-icons/fa"

export default function ReportAnalyzer() {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const [analysisResult, setAnalysisResult] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile)
        setFileName(selectedFile.name)
        setUploadError("")
      } else {
        setUploadError("Please upload a PDF file")
        setFile(null)
        setFileName("")
      }
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) {
      setUploadError("Please select a file to upload")
      return
    }

    setIsUploading(true)
    setUploadError("")

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/analyze-report", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadError("Failed to analyze report. Please try again.")
    } finally {
      setIsUploading(false)
      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  const getRiskLevelColor = (level) => {
    switch (level) {
      case "Low":
        return "text-green-600"
      case "Moderate":
        return "text-yellow-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Medical Report Analysis</h2>
      <p className="text-gray-600 mb-6">
        Upload your medical report (PDF) and our AI will analyze it for diabetes risk factors and provide personalized
        recommendations.
      </p>

      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 mb-6 border border-purple-100">
        <div className="flex flex-col items-center">
          <div className="w-full max-w-md">
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  id="report-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="application/pdf"
                />
                <label htmlFor="report-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center space-y-2">
                    <FaFilePdf className="h-10 w-10 text-purple-500" />
                    <span className="text-sm font-medium text-gray-700">
                      Drag & drop your PDF report or click to browse
                    </span>
                    <span className="text-xs text-gray-500">(PDF files only, max 10MB)</span>
                  </div>
                </label>
              </div>

              {fileName && (
                <div className="flex items-center justify-between bg-white p-3 rounded-md border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <FaFilePdf className="text-purple-500" />
                    <span className="text-sm truncate max-w-[200px]">{fileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null)
                      setFileName("")
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    &times;
                  </button>
                </div>
              )}

              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              {uploadError && (
                <div className="text-red-500 text-sm flex items-center">
                  <FaExclamationTriangle className="mr-2" />
                  {uploadError}
                </div>
              )}

              <button
                type="submit"
                disabled={!file || isUploading}
                className={`w-full flex items-center justify-center py-2 px-4 rounded-md transition ${
                  !file || isUploading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {isUploading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Analyzing Report...
                  </>
                ) : (
                  <>
                    <FaFileUpload className="mr-2" />
                    Analyze Report
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {analysisResult && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 transition-all duration-300 animate-fadeIn">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Analysis Results</h3>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(analysisResult.riskLevel)} bg-opacity-10 bg-current`}
            >
              {analysisResult.riskLevel} Risk
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Key Health Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(analysisResult.metrics || {}).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500">{key}</div>
                  <div className="font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Analysis</h4>
            <p className="text-gray-600">{analysisResult.analysis}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
            <ul className="space-y-2">
              {analysisResult.recommendations?.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Important Note</h3>
        <p className="text-sm text-blue-700">
          This AI analysis is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the
          advice of your physician or other qualified health provider with any questions you may have regarding a
          medical condition.
        </p>
      </div>
    </div>
  )
}