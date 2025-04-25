"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

const HealthChart = ({ chartData, yAxisLabel = "Values" }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    // Check if chartData is valid and has datasets
    if (chartRef.current && chartData && chartData.datasets && chartData.datasets.length > 0) {
      // Destroy previous chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }

      const myChart = new Chart(chartRef.current, {
        type: "line",
        // Use the chartData prop directly
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000, // Slightly faster animation
          },
          scales: {
            x: {
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
              title: {
                display: true,
                text: "Date / Time", // More generic label
                color: "rgba(0,0,0,0.7)",
                font: {
                  size: 14,
                },
              },
            },
            // Use the yAxisLabel prop for the Y-axis title
            y: { // Primary Y-axis configuration
              grid: {
                color: "rgba(0,0,0,0.1)",
              },
              title: {
                display: true,
                text: yAxisLabel, // Use the prop here
                color: "rgba(0,0,0,0.7)",
                font: {
                  size: 14,
                },
              },
            },
          },
          plugins: {
            legend: {
              position: 'top', // Position legend at the top
              labels: {
                color: "rgba(0,0,0,0.7)",
                font: {
                  size: 12,
                },
              },
            },
            tooltip: { // Customize tooltips if needed
                mode: 'index',
                intersect: false,
            },
          },
          interaction: { // Improve hover interaction
            mode: 'index',
            intersect: false,
          },
        },
      })

      chartRef.current.chart = myChart
    } else if (chartRef.current && chartRef.current.chart) {
        // If no valid data, destroy the existing chart
        chartRef.current.chart.destroy();
        chartRef.current.chart = null; // Clear the reference
    }

    // Cleanup function
    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.destroy()
        chartRef.current.chart = null; // Clear reference on unmount
      }
    }
    // Depend on chartData prop
  }, [chartData, yAxisLabel])

  return (
    <div className="w-full">
      <div className="h-[300px] w-full">
        {/* Render canvas only if chartData is potentially valid */}
        {chartData && chartData.datasets && chartData.datasets.length > 0 ? (
             <canvas ref={chartRef}></canvas>
        ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
                No data available for chart
            </div>
        )}
      </div>
    </div>
  )
}

export default HealthChart

