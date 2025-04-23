

"use client"
import { useState, useEffect } from "react"
import LineGraph from "../../components/LineGraph"
import ChatBot from "../../components/Chatbot"
import BarGraph from "../../components/BarGraph"
import {
FaChartLine, FaChartBar, FaChartPie, FaChartArea,
FaDownload, FaShareAlt, FaCalendarAlt, FaPrint,
FaBell, FaUserMd, FaClipboardList, FaExclamationTriangle
} from "react-icons/fa"
import { TbCalendarStats } from "react-icons/tb"
import { GiMedicinePills } from "react-icons/gi"
import { MdTrendingUp, MdTrendingDown, MdOutlineWaterDrop } from "react-icons/md"

const Layout = () => {
const [activeTab, setActiveTab] = useState("overview")
const [timeRange, setTimeRange] = useState("week")
const [showChatbot, setShowChatbot] = useState(true)
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
// Simulate data loading
const timer = setTimeout(() => {
setIsLoading(false)
}, 1000)
return () => clearTimeout(timer)
}, [])

const handleExportData = () => {
alert("Exporting data report as PDF...")
// Implementation for actual export would go here
}

const handleShareData = () => {
alert("Share feature opened. You can share with your healthcare provider.")
// Implementation for actual sharing would go here
}

const handlePrintReport = () => {
alert("Preparing to print your health report...")
// Implementation for printing would go here
}

// Sample data for different tabs
const tabContent = {
overview: (
<div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
<div className="xl:col-span-3 bg-white p-6 rounded-lg shadow-sm">
<div className="flex justify-between items-center mb-4">
<h2 className="text-xl font-bold">Glucose Monitoring</h2>
<div className="flex space-x-2">
<button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Daily</button>
<button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Weekly</button>
<button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Monthly</button>
</div>
</div>
<LineGraph />
</div>
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<BarGraph />
</div>
</div>
),
glucose: (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Glucose Trends</h2>
<div className="flex justify-between items-center mb-4">
<div>
<span className="text-sm font-medium text-gray-500">Average</span>
<div className="text-2xl font-bold">124 mg/dL</div>
</div>
<div>
<span className="text-sm font-medium text-gray-500">Highest</span>
<div className="text-2xl font-bold text-red-500">182 mg/dL</div>
</div>
<div>
<span className="text-sm font-medium text-gray-500">Lowest</span>
<div className="text-2xl font-bold text-green-500">98 mg/dL</div>
</div>
</div>
<LineGraph />
<div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="bg-green-50 p-4 rounded-lg">
<div className="flex items-center">
<MdTrendingDown className="text-green-500 text-xl mr-2" />
<span className="text-sm font-medium">Low Events</span>
</div>
<div className="text-2xl font-bold mt-2">2</div>
<div className="text-xs text-gray-500">Last 7 days</div>
</div>
<div className="bg-red-50 p-4 rounded-lg">
<div className="flex items-center">
<MdTrendingUp className="text-red-500 text-xl mr-2" />
<span className="text-sm font-medium">High Events</span>
</div>
<div className="text-2xl font-bold mt-2">5</div>
<div className="text-xs text-gray-500">Last 7 days</div>
</div>
<div className="bg-blue-50 p-4 rounded-lg">
<div className="flex items-center">
<MdOutlineWaterDrop className="text-blue-500 text-xl mr-2" />
<span className="text-sm font-medium">A1C Estimate</span>
</div>
<div className="text-2xl font-bold mt-2">6.2%</div>
<div className="text-xs text-gray-500">Based on 90 days</div>
</div>
</div>
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Daily Patterns</h2>
<div className="space-y-4">
<div>
<h3 className="font-medium text-gray-700">Morning (6 AM - 12 PM)</h3>
<div className="flex items-center mt-1">
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div className="bg-green-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
</div>
<span className="ml-2 text-sm font-medium">120 mg/dL</span>
</div>
</div>
<div>
<h3 className="font-medium text-gray-700">Afternoon (12 PM - 6 PM)</h3>
<div className="flex items-center mt-1">
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
</div>
<span className="ml-2 text-sm font-medium">145 mg/dL</span>
</div>
</div>
<div>
<h3 className="font-medium text-gray-700">Evening (6 PM - 12 AM)</h3>
<div className="flex items-center mt-1">
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div className="bg-red-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
</div>
<span className="ml-2 text-sm font-medium">160 mg/dL</span>
</div>
</div>
<div>
<h3 className="font-medium text-gray-700">Night (12 AM - 6 AM)</h3>
<div className="flex items-center mt-1">
<div className="w-full bg-gray-200 rounded-full h-2.5">
<div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "55%" }}></div>
</div>
<span className="ml-2 text-sm font-medium">110 mg/dL</span>
</div>
</div>
</div>
<div className="mt-6">
<h3 className="font-medium text-gray-700 mb-2">Recommendations</h3>
<ul className="space-y-2 text-sm">
<li className="flex items-start">
<FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
<span>Consider reducing carb intake in the evening meals</span>
</li>
<li className="flex items-start">
<FaExclamationTriangle className="text-yellow-500 mt-1 mr-2 flex-shrink-0" />
<span>Morning readings are stable, maintain current routine</span>
</li>
</ul>
</div>
</div>
</div>
),
activity: (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Physical Activity</h2>
<div className="flex justify-between items-center mb-4">
<div>
<span className="text-sm font-medium text-gray-500">Weekly Goal</span>
<div className="text-2xl font-bold">150 min</div>
</div>
<div>
<span className="text-sm font-medium text-gray-500">Completed</span>
<div className="text-2xl font-bold text-blue-500">120 min</div>
</div>
<div>
<span className="text-sm font-medium text-gray-500">Remaining</span>
<div className="text-2xl font-bold text-orange-500">30 min</div>
</div>
</div>
<div className="w-full bg-gray-200 rounded-full h-4 mb-6">
<div className="bg-blue-500 h-4 rounded-full" style={{ width: "80%" }}></div>
</div>
<BarGraph />
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Activity Log</h2>
<div className="space-y-4">
<div className="border-l-4 border-green-500 pl-3 py-1">
<p className="font-semibold">Walking</p>
<p className="text-sm text-gray-600">Today, 8:30 AM - 30 minutes</p>
<p className="text-xs text-gray-500">Impact: Glucose -15 mg/dL</p>
</div>
<div className="border-l-4 border-blue-500 pl-3 py-1">
<p className="font-semibold">Swimming</p>
<p className="text-sm text-gray-600">Yesterday, 5:15 PM - 45 minutes</p>
<p className="text-xs text-gray-500">Impact: Glucose -25 mg/dL</p>
</div>
<div className="border-l-4 border-purple-500 pl-3 py-1">
<p className="font-semibold">Yoga</p>
<p className="text-sm text-gray-600">2 days ago, 7:00 AM - 20 minutes</p>
<p className="text-xs text-gray-500">Impact: Glucose -10 mg/dL</p>
</div>
<div className="border-l-4 border-yellow-500 pl-3 py-1">
<p className="font-semibold">Cycling</p>
<p className="text-sm text-gray-600">3 days ago, 6:30 PM - 25 minutes</p>
<p className="text-xs text-gray-500">Impact: Glucose -20 mg/dL</p>
</div>
</div>
<button className="w-full mt-4 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100">
Add Activity
</button>
</div>
</div>
),
medication: (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Medication Tracking</h2>
<div className="overflow-x-auto">
<table className="min-w-full divide-y divide-gray-200">
<thead className="bg-gray-50">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dosage</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Taken</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
<tr>
<td className="px-6 py-4 whitespace-nowrap">Metformin</td>
<td className="px-6 py-4 whitespace-nowrap">500mg</td>
<td className="px-6 py-4 whitespace-nowrap">Twice daily</td>
<td className="px-6 py-4 whitespace-nowrap">Today, 8:00 AM</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
Taken
</span>
</td>
</tr>
<tr>
<td className="px-6 py-4 whitespace-nowrap">Insulin</td>
<td className="px-6 py-4 whitespace-nowrap">10 units</td>
<td className="px-6 py-4 whitespace-nowrap">Before meals</td>
<td className="px-6 py-4 whitespace-nowrap">Today, 12:30 PM</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
Taken
</span>
</td>
</tr>
<tr>
<td className="px-6 py-4 whitespace-nowrap">Glipizide</td>
<td className="px-6 py-4 whitespace-nowrap">5mg</td>
<td className="px-6 py-4 whitespace-nowrap">Once daily</td>
<td className="px-6 py-4 whitespace-nowrap">Yesterday, 9:00 AM</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
Due
</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Medication Reminders</h2>
<div className="space-y-4">
<div className="bg-yellow-50 p-4 rounded-lg">
<div className="flex justify-between items-center">
<div className="flex items-center">
<FaBell className="text-yellow-500 mr-2" />
<div>
<p className="font-medium">Metformin 500mg</p>
<p className="text-sm text-gray-600">Due at 8:00 PM</p>
</div>
</div>
<button className="bg-white text-yellow-500 px-3 py-1 rounded-md border border-yellow-500 text-sm">
Snooze
</button>
</div>
</div>
<div className="bg-red-50 p-4 rounded-lg">
<div className="flex justify-between items-center">
<div className="flex items-center">
<FaBell className="text-red-500 mr-2" />
<div>
<p className="font-medium">Glipizide 5mg</p>
<p className="text-sm text-gray-600">Overdue by 2 hours</p>
</div>
</div>
<button className="bg-white text-red-500 px-3 py-1 rounded-md border border-red-500 text-sm">
Take Now
</button>
</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="flex justify-between items-center">
<div className="flex items-center">
<FaBell className="text-gray-400 mr-2" />
<div>
<p className="font-medium">Insulin</p>
<p className="text-sm text-gray-600">Due before dinner</p>
</div>
</div>
<button className="bg-white text-gray-500 px-3 py-1 rounded-md border border-gray-500 text-sm">
Remind
</button>
</div>
</div>
</div>
<button className="w-full mt-4 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100">
Add Medication
</button>
</div>
</div>
),
reports: (
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
<div className="xl:col-span-2 bg-white p-6 rounded-lg shadow-sm">
<div className="flex justify-between items-center mb-4">
<h2 className="text-xl font-bold">Health Reports</h2>
<div className="flex space-x-2">
<button onClick={handlePrintReport} className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
<FaPrint className="mr-1" /> Print
</button>
<button onClick={handleExportData} className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
<FaDownload className="mr-1" /> Export
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="min-w-full divide-y divide-gray-200">
<thead className="bg-gray-50">
<tr>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
<tr>
<td className="px-6 py-4 whitespace-nowrap">A1C Test</td>
<td className="px-6 py-4 whitespace-nowrap">Jan 15, 2023</td>
<td className="px-6 py-4 whitespace-nowrap">Dr. Smith</td>
<td className="px-6 py-4 whitespace-nowrap">6.2%</td>
<td className="px-6 py-4 whitespace-nowrap">
<button className="text-blue-600 hover:text-blue-800">View</button>
</td>
</tr>
<tr>
<td className="px-6 py-4 whitespace-nowrap">Lipid Panel</td>
<td className="px-6 py-4 whitespace-nowrap">Feb 22, 2023</td>
<td className="px-6 py-4 whitespace-nowrap">Dr. Johnson</td>
<td className="px-6 py-4 whitespace-nowrap">Normal</td>
<td className="px-6 py-4 whitespace-nowrap">
<button className="text-blue-600 hover:text-blue-800">View</button>
</td>
</tr>
<tr>
<td className="px-6 py-4 whitespace-nowrap">Kidney Function</td>
<td className="px-6 py-4 whitespace-nowrap">Mar 10, 2023</td>
<td className="px-6 py-4 whitespace-nowrap">Dr. Williams</td>
<td className="px-6 py-4 whitespace-nowrap">Normal</td>
<td className="px-6 py-4 whitespace-nowrap">
<button className="text-blue-600 hover:text-blue-800">View</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div className="bg-white p-6 rounded-lg shadow-sm">
<h2 className="text-xl font-bold mb-4">Upcoming Appointments</h2>
<div className="space-y-4">
<div className="border-l-4 border-blue-500 pl-3 py-1">
<p className="font-semibold">Endocrinologist</p>
<p className="text-sm text-gray-600">Dr. Sarah Johnson</p>
<p className="text-sm text-gray-600">April 15, 2023 - 10:00 AM</p>
<div className="flex space-x-2 mt-2">
<button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Reschedule</button>
<button className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">Cancel</button>
</div>
</div>
<div className="border-l-4 border-green-500 pl-3 py-1">
<p className="font-semibold">Nutritionist</p>
<p className="text-sm text-gray-600">Emily Wilson, RD</p>
<p className="text-sm text-gray-600">April 22, 2023 - 2:30 PM</p>
<div className="flex space-x-2 mt-2">
<button className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">Reschedule</button>
<button className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">Cancel</button>
</div>
</div>
</div>
<button className="w-full mt-4 bg-blue-50 text-blue-700 py-2 rounded-lg hover:bg-blue-100">
Book New Appointment
</button>
</div>
</div>
),
}

return (
<div>
{showChatbot && <ChatBot />}
<div className="flex-1 p-6 overflow-auto">
{isLoading ? (
<div className="flex flex-col items-center justify-center h-full">
<div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
<p className="mt-4 text-gray-600">Loading your health analytics...</p>
</div>
) : (
<>
<div className="mb-8">
<div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
<div>
<h1 className="text-3xl font-bold mb-2">Health Analytics Dashboard</h1>
<p className="text-gray-600">Track your diabetes metrics and stay informed about your health progress</p>
</div>
<div className="flex mt-4 md:mt-0 space-x-3">
<button
                 onClick={handleExportData}
                 className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
               >
<FaDownload className="mr-2" /> Export
</button>
<button
                 onClick={handleShareData}
                 className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
               >
<FaShareAlt className="mr-2" /> Share
</button>
<button
onClick={() => setShowChatbot(!showChatbot)}
className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100"
>
{showChatbot ? "Hide Assistant" : "Show Assistant"}
</button>
</div>
</div>


          {/* Time Range Selector */}
          <div className="flex items-center mb-6">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span className="mr-3 text-gray-700">Time Range:</span>
            <div className="flex border rounded-lg overflow-hidden">
              {["day", "week", "month", "3month", "year"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 ${
                    timeRange === range ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {range === "day"
                    ? "Day"
                    : range === "week"
                      ? "Week"
                      : range === "month"
                        ? "Month"
                        : range === "3month"
                          ? "3 Months"
                          : "Year"}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="flex flex-wrap border-b mb-6 overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: <FaChartArea /> },
              { id: "glucose", label: "Glucose Trends", icon: <FaChartLine /> },
              { id: "activity", label: "Activity", icon: <FaChartBar /> },
              { id: "medication", label: "Medication", icon: <GiMedicinePills /> },
              { id: "reports", label: "Reports", icon: <TbCalendarStats /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-5 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-b-2 border-blue-500 text-blue-700"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area - Dynamic based on active tab */}
        {tabContent[activeTab]}

        {/* Additional Analytics Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
          {/* Health Insights Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaChartPie className="mr-2 text-blue-500" /> Health Insights
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Average Glucose</span>
                <span className="font-semibold">124 mg/dL</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "70%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Time in Range</span>
                <span className="font-semibold">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">A1C Estimate</span>
                <span className="font-semibold">6.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "62%" }}></div>
              </div>
            </div>
          </div>

          {/* Recent Events Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Recent Events</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-3 py-1">
                <p className="font-semibold">High Glucose Alert</p>
                <p className="text-sm text-gray-600">Today, 2:30 PM - 182 mg/dL</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3 py-1">
                <p className="font-semibold">Workout Completed</p>
                <p className="text-sm text-gray-600">Yesterday, 6:15 PM - 45 minutes</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="font-semibold">Medication Taken</p>
                <p className="text-sm text-gray-600">Yesterday, 8:00 AM - 500mg Metformin</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-3 py-1">
                <p className="font-semibold">Doctor Appointment</p>
                <p className="text-sm text-gray-600">Next Tuesday, 10:00 AM</p>
              </div>
            </div>
          </div>

          {/* Recommendations Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">Personalized Recommendations</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FaChartLine className="text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Consider post-meal walks</p>
                  <p className="text-sm text-gray-600">
                    Walking for 15 minutes after meals can help reduce post-meal glucose spikes.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <GiMedicinePills className="text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Medication adjustment</p>
                  <p className="text-sm text-gray-600">
                    Based on your morning readings, discuss adjusting your evening insulin with your doctor.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <FaCalendarAlt className="text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Schedule lab tests</p>
                  <p className="text-sm text-gray-600">
                    It&apos;s been 3 months since your last A1C test. Consider scheduling one soon.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    )}
  </div>
</div>

)
}

export default Layout
