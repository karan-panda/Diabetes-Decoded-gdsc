// import React, { useRef, useEffect, useState } from 'react';
// import Chart from 'chart.js/auto';
// import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
// import { db } from '../pages/firebase';

// const BarGraph = () => {
//   const chartRef = useRef(null);
//   const [stepData, setstepData] = useState([]);
//   const [labels, setLabels] = useState([]);
//   const [totalSteps, setTotalSteps] = useState(0);

//   useEffect(() => {
//     const fetchstepData = async () => {
//       try {
//         const q = query(collection(db, "stepData"), orderBy("timestamp", "desc"), limit(7));
//         const querySnapshot = await getDocs(q);
//         const fetchedstepData = [];
//         const fetchedLabels = [];
//         let stepsSum = 0;
//         querySnapshot.forEach((doc) => {
//           const data = doc.data();
//           if (data.Steps && data.timestamp) {
//             fetchedLabels.push(new Date(data.timestamp.seconds * 1000).toLocaleDateString());
//             fetchedstepData.push(data.Steps);
//             stepsSum += data.Steps;
//           } else {
//             console.warn("Document missing required fields:", doc.id);
//           }
//         });
//         setstepData(fetchedstepData.reverse()); // Reverse to show the latest date last
//         setLabels(fetchedLabels.reverse()); // Reverse to show the latest date last
//         setTotalSteps(stepsSum);
//       } catch (error) {
//         console.error("Error fetching steps data:", error);
//       }
//     };

//     fetchstepData();
//   }, []);

//   useEffect(() => {
//     if (stepData.length > 0 && labels.length > 0) {
//       const myChart = new Chart(chartRef.current, {
//         type: 'bar',
//         data: {
//           labels: labels,
//           datasets: [
//             {
//               data: stepData,
//               label: "Steps",
//               borderColor: "rgb(62,14,205)",
//               backgroundColor: "rgba(31,210,134,1)",
//               borderWidth: 1,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             x: {
//               barThickness: 20,
//               grid: {
//                 display: false,
//               },
//             },
//             y: {
//               display: true,
//               grid: {
//                 display: true,
//               },
//             },
//           },
//           plugins: {
//             legend: {
//               display: false,
//             },
//           },
//         },
//       });

//       return () => {
//         myChart.destroy();
//       };
//     }
//   }, [stepData, labels]);

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
//       <p className='font-bold text-2xl mb-4 text-center'>Last 7 Days Steps Count</p>
//       <div className="flex justify-center items-center mb-4">
//         <div className="text-center">
//           <h1 className='font-bold text-3xl text-blue-600'>{totalSteps.toLocaleString()}</h1>
//           <p className='text-gray-600'>Steps Walked</p>
//         </div>
//       </div>
//       <canvas ref={chartRef} />
//     </div>
//   );
// };

// export default BarGraph;



"use client"

import { useRef, useEffect, useState } from "react"
import Chart from "chart.js/auto"
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore"
import { db } from "../pages/firebase"
import { FaRunning, FaBurn, FaArrowUp, FaArrowDown } from "react-icons/fa"

const BarGraph = () => {
  const chartRef = useRef(null)
  const [stepData, setstepData] = useState([])
  const [labels, setLabels] = useState([])
  const [totalSteps, setTotalSteps] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [weeklyChange, setWeeklyChange] = useState(0)

  useEffect(() => {
    const fetchstepData = async () => {
      setIsLoading(true)
      try {
        const q = query(collection(db, "stepData"), orderBy("timestamp", "desc"), limit(14))
        const querySnapshot = await getDocs(q)
        const fetchedstepData = []
        const fetchedLabels = []
        let stepsSum = 0

        querySnapshot.forEach((doc) => {
          const data = doc.data()
          if (data.Steps && data.timestamp) {
            const date = new Date(data.timestamp.seconds * 1000)
            fetchedLabels.push(date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }))
            fetchedstepData.push(data.Steps)

            // Only count last 7 days for total
            if (fetchedstepData.length <= 7) {
              stepsSum += data.Steps
            }
          } else {
            console.warn("Document missing required fields:", doc.id)
          }
        })

        // Calculate weekly change
        const currentWeekTotal = fetchedstepData.slice(0, 7).reduce((sum, steps) => sum + steps, 0)
        const previousWeekTotal = fetchedstepData.slice(7, 14).reduce((sum, steps) => sum + steps, 0)

        if (previousWeekTotal > 0) {
          const percentChange = ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100
          setWeeklyChange(percentChange)
        }

        // Reverse arrays to show chronological order
        setstepData(fetchedstepData.slice(0, 7).reverse())
        setLabels(fetchedLabels.slice(0, 7).reverse())
        setTotalSteps(stepsSum)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching steps data:", error)
        setIsLoading(false)
      }
    }

    fetchstepData()
  }, [])

  useEffect(() => {
    if (stepData.length > 0 && labels.length > 0 && !isLoading) {
      // Destroy old chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }

      // Calculate daily goal achievement
      const dailyGoal = 10000 // Example goal
      const goalAchievementColor = stepData.map((steps) =>
        steps >= dailyGoal ? "rgba(34, 197, 94, 0.8)" : "rgba(31, 210, 134, 0.6)",
      )

      const myChart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              data: stepData,
              label: "Steps",
              backgroundColor: goalAchievementColor,
              borderColor: goalAchievementColor.map((color) => color.replace("0.6", "1")),
              borderWidth: 1,
              borderRadius: 6,
              barPercentage: 0.7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: "rgba(0, 0, 0, 0.05)",
              },
              ticks: {
                callback: (value) => {
                  if (value >= 1000) {
                    return value / 1000 + "k"
                  }
                  return value
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const stepCount = context.parsed.y
                  const goalPercentage = Math.round((stepCount / dailyGoal) * 100)
                  return [`Steps: ${stepCount.toLocaleString()}`, `Daily Goal: ${goalPercentage}%`]
                },
              },
            },
          },
        },
      })

      // Store chart instance
      chartRef.current.chart = myChart

      return () => {
        if (myChart) {
          myChart.destroy()
        }
      }
    }
  }, [stepData, labels, isLoading])

  // Calculate calories burned (rough estimate)
  const caloriesBurned = Math.round(totalSteps * 0.04)

  // Calculate average steps per day
  const averageSteps = stepData.length > 0 ? Math.round(totalSteps / stepData.length) : 0

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Activity Tracking</h2>
        <select className="p-1 text-sm border rounded bg-gray-50">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <FaRunning className="text-blue-600 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Steps</p>
                <p className="font-bold text-xl">{totalSteps.toLocaleString()}</p>
                <div className="flex items-center text-xs mt-1">
                  {weeklyChange > 0 ? (
                    <>
                      <FaArrowUp className="text-green-500 mr-1" />
                      <span className="text-green-600">{Math.abs(weeklyChange).toFixed(1)}% vs last week</span>
                    </>
                  ) : (
                    <>
                      <FaArrowDown className="text-red-500 mr-1" />
                      <span className="text-red-600">{Math.abs(weeklyChange).toFixed(1)}% vs last week</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4 flex items-center">
              <div className="bg-orange-100 p-3 rounded-full mr-3">
                <FaBurn className="text-orange-600 text-xl" />
              </div>
              <div>
                <p className="text-xs text-gray-600">Calories Burned</p>
                <p className="font-bold text-xl">{caloriesBurned}</p>
                <p className="text-xs text-gray-600 mt-1">Avg {Math.round(caloriesBurned / 7)} per day</p>
              </div>
            </div>
          </div>

          <div className="h-64 relative">
            <canvas ref={chartRef} />

            {/* Goal line - 10,000 steps */}
            <div
              className="absolute border-t-2 border-dashed border-red-400 left-0 right-0 text-right"
              style={{ top: "30%" }}
            >
              <span className="inline-block bg-red-50 text-red-600 text-xs px-1 py-0.5 rounded -mt-2.5 mr-1">
                Goal: 10,000
              </span>
            </div>
          </div>

          <div className="text-center mt-4 text-sm text-gray-600">
            <p>
              Daily Average: <span className="font-bold">{averageSteps.toLocaleString()} steps</span>
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default BarGraph

