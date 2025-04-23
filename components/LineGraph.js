"use client"

import { useEffect, useRef, useState } from "react"
import Chart from "chart.js/auto"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../lib/firebase"
import { BiSolidUpArrowAlt } from "react-icons/bi"
import { BsRobot } from "react-icons/bs"

const HealthChart = () => {
  const chartRef = useRef(null)
  const [selectedParameter, setSelectedParameter] = useState("Glucose")
  const [data, setData] = useState({
    Glucose: [],
    "Blood Pressure": [],
    BMI: [],
    Insulin: [],
  })
  const [labels, setLabels] = useState([])

  const colors = {
    Glucose: "rgb(62,14,205)",
    "Blood Pressure": "rgb(255,0,0)",
    BMI: "rgb(255,165,0)",
    Insulin: "rgb(0,0,255)",
  }

  const backgroundColors = {
    Glucose: "rgba(62,14,205,0.2)",
    "Blood Pressure": "rgba(255,0,0,0.2)",
    BMI: "rgba(255,165,0,0.2)",
    Insulin: "rgba(0,0,255,0.2)",
  }

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "healthData"), orderBy("timestamp", "desc"), limit(7))
      const querySnapshot = await getDocs(q)
      const fetchedData = {
        Glucose: [],
        "Blood Pressure": [],
        BMI: [],
        Insulin: [],
      }
      const fetchedLabels = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        fetchedLabels.push(data.timestamp.toDate().toLocaleDateString())
        fetchedData.Glucose.push(data.Glucose)
        fetchedData["Blood Pressure"].push(data["Blood Pressure"])
        fetchedData.BMI.push(data.BMI)
        fetchedData.Insulin.push(data.Insulin)
      })
      setData(fetchedData)
      setLabels(fetchedLabels.reverse()) // Reverse to show the latest date last
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }

      const myChart = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              data: data[selectedParameter],
              label: selectedParameter,
              borderColor: colors[selectedParameter],
              backgroundColor: backgroundColors[selectedParameter],
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 2000,
          },
          scales: {
            x: {
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
              title: {
                display: true,
                text: "Date",
                color: "rgba(0,0,0,0.7)",
                font: {
                  size: 14,
                },
              },
            },
            y: {
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
              title: {
                display: true,
                text: "Values",
                color: "rgba(0,0,0,0.7)",
                font: {
                  size: 14,
                },
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "rgba(0,0,0,0.7)",
                font: {
                  size: 12,
                },
              },
            },
          },
        },
      })

      // Store chart instance for cleanup
      chartRef.current.chart = myChart
    }

    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }
    }
  }, [selectedParameter, data, labels])

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className={`text-sm py-1 px-3 rounded-full transition-colors ${
            selectedParameter === "Glucose" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
          onClick={() => setSelectedParameter("Glucose")}
        >
          Glucose
        </button>
        <button
          className={`text-sm py-1 px-3 rounded-full transition-colors ${
            selectedParameter === "Blood Pressure"
              ? "bg-red-500 text-white"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
          onClick={() => setSelectedParameter("Blood Pressure")}
        >
          Blood Pressure
        </button>
        <button
          className={`text-sm py-1 px-3 rounded-full transition-colors ${
            selectedParameter === "BMI"
              ? "bg-yellow-500 text-white"
              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
          }`}
          onClick={() => setSelectedParameter("BMI")}
        >
          BMI
        </button>
        <button
          className={`text-sm py-1 px-3 rounded-full transition-colors ${
            selectedParameter === "Insulin"
              ? "bg-purple-500 text-white"
              : "bg-purple-100 text-purple-700 hover:bg-purple-200"
          }`}
          onClick={() => setSelectedParameter("Insulin")}
        >
          Insulin
        </button>
      </div>

      <div className="h-[300px] w-full">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
        <div className="p-3 bg-white shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg">
            {selectedParameter === "Glucose"
              ? "124 mg/dL"
              : selectedParameter === "Blood Pressure"
                ? "120/80"
                : selectedParameter === "BMI"
                  ? "24.5"
                  : "15 μU/mL"}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-sm">Average {selectedParameter}</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-green-600 text-sm">+2.45% </p>
            <BiSolidUpArrowAlt className="text-green-600" />
          </div>
        </div>

        <div className="p-3 bg-white shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg">
            {selectedParameter === "Glucose"
              ? "78%"
              : selectedParameter === "Blood Pressure"
                ? "85%"
                : selectedParameter === "BMI"
                  ? "Healthy"
                  : "Normal"}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-sm">Status</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-green-600 text-sm">Stable</p>
            <BiSolidUpArrowAlt className="text-green-600" />
          </div>
        </div>

        <div className="p-3 bg-white shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="font-bold text-lg">
            {selectedParameter === "Glucose"
              ? "Low"
              : selectedParameter === "Blood Pressure"
                ? "Moderate"
                : selectedParameter === "BMI"
                  ? "Low"
                  : "Moderate"}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-sm">Risk Level</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-green-600 text-sm">Improving</p>
            <BiSolidUpArrowAlt className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
        <div className="bg-blue-500 text-white rounded-full p-2 mr-3 mt-1">
          <BsRobot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-blue-700">AI Assistant Insight</h3>
          <p className="text-gray-700 mt-1">
            Based on your {selectedParameter.toLowerCase()} data, you&apos;re maintaining healthy levels.
            {selectedParameter === "Glucose" &&
              " Your glucose readings show good stability throughout the week. Consider maintaining your current diet and exercise routine."}
            {selectedParameter === "Blood Pressure" &&
              " Your blood pressure is well-controlled. Continue with your current medication regimen and low-sodium diet."}
            {selectedParameter === "BMI" &&
              " Your BMI is in the healthy range. Keep up with your balanced diet and regular exercise."}
            {selectedParameter === "Insulin" &&
              " Your insulin levels are appropriate. Continue monitoring and taking medication as prescribed."}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HealthChart

